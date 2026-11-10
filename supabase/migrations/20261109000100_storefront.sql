create table public.products (
    id text primary key check (id ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
    name text not null,
    category text not null,
    description text not null,
    image_path text not null check (image_path ~ '^/assets/[A-Za-z0-9._-]+$'),
    price_cents integer not null check (price_cents between 1 and 100000),
    sort_order integer not null default 0,
    available boolean not null default true,
    legacy_record jsonb
);

create table public.orders (
    id uuid primary key default gen_random_uuid(),
    request_id uuid not null unique,
    customer_name text not null check (char_length(customer_name) between 2 and 100),
    phone text not null check (char_length(phone) between 7 and 32),
    delivery_address text not null check (char_length(delivery_address) between 8 and 300),
    requested_items jsonb not null,
    total_cents integer not null check (total_cents > 0),
    status text not null default 'received' check (status in ('received', 'confirmed', 'completed', 'cancelled')),
    created_at timestamptz not null default now()
);

create table public.order_items (
    order_id uuid not null references public.orders(id),
    product_id text not null references public.products(id),
    product_name text not null,
    unit_price_cents integer not null check (unit_price_cents > 0),
    quantity integer not null check (quantity between 1 and 20),
    primary key (order_id, product_id)
);

alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

revoke all on public.products, public.orders, public.order_items from public, anon, authenticated, service_role;
grant select (id, name, category, description, image_path, price_cents, sort_order, available)
    on public.products to anon, authenticated;
grant select on public.products to service_role;
grant select, insert on public.orders, public.order_items to service_role;
create policy "Read available products" on public.products for select
    to anon, authenticated using (available);

create function public.submit_order(
    p_request_id uuid,
    p_name text,
    p_phone text,
    p_address text,
    p_items jsonb
)
returns table (order_id uuid, total_cents integer)
language plpgsql
security invoker
set search_path = ''
as $$
declare
    previous public.orders%rowtype;
    new_order_id uuid;
    priced_items jsonb;
    order_total integer;
    price_changed boolean;
begin
    if p_items is null or jsonb_typeof(p_items) <> 'array' then
        raise exception 'invalid_cart' using errcode = 'P0001';
    end if;
    if p_request_id is null or jsonb_array_length(p_items) not between 1 and 20
        or exists (
            select 1 from jsonb_array_elements(p_items) as item
            where coalesce(item->>'id', '') !~ '^[a-z0-9]+(-[a-z0-9]+)*$'
                or coalesce(item->>'quantity', '') !~ '^([1-9]|1[0-9]|20)$'
                or coalesce(item->>'unit_price_cents', '') !~ '^[1-9][0-9]{0,5}$'
        )
        or (select count(distinct item->>'id') from jsonb_array_elements(p_items) as item)
            <> jsonb_array_length(p_items) then
        raise exception 'invalid_cart' using errcode = 'P0001';
    end if;

    perform pg_advisory_xact_lock(hashtextextended(p_request_id::text, 0));
    select * into previous from public.orders where request_id = p_request_id;
    if found then
        if previous.customer_name is distinct from p_name
            or previous.phone is distinct from p_phone
            or previous.delivery_address is distinct from p_address
            or previous.requested_items is distinct from p_items then
            raise exception 'request_conflict' using errcode = 'P0001';
        end if;
        return query select previous.id, previous.total_cents;
        return;
    end if;

    select jsonb_agg(jsonb_build_object(
        'product_id', product.id, 'product_name', product.name,
        'unit_price_cents', product.price_cents, 'quantity', item.quantity
    )), sum(product.price_cents * item.quantity), bool_or(product.price_cents <> item.unit_price_cents)
    into priced_items, order_total, price_changed
    from jsonb_to_recordset(p_items) as item(id text, quantity integer, unit_price_cents integer)
    join public.products product on product.id = item.id and product.available;

    if coalesce(jsonb_array_length(priced_items), 0) <> jsonb_array_length(p_items) then
        raise exception 'item_unavailable' using errcode = 'P0001';
    end if;
    if price_changed then
        raise exception 'price_changed' using errcode = 'P0001';
    end if;

    insert into public.orders (request_id, customer_name, phone, delivery_address, requested_items, total_cents)
    values (p_request_id, p_name, p_phone, p_address, p_items, order_total)
    returning id into new_order_id;

    insert into public.order_items (order_id, product_id, product_name, unit_price_cents, quantity)
    select new_order_id, item.product_id, item.product_name, item.unit_price_cents, item.quantity
    from jsonb_to_recordset(priced_items)
        as item(product_id text, product_name text, unit_price_cents integer, quantity integer);

    return query select new_order_id, order_total;
end;
$$;

revoke execute on function public.submit_order(uuid, text, text, text, jsonb) from public, anon, authenticated;
grant execute on function public.submit_order(uuid, text, text, text, jsonb) to service_role;
