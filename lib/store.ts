import { randomUUID } from "node:crypto";
import catalog from "@/data/catalog.json";
import type { Product } from "./catalog";
import type { parseOrder } from "./checkout";

type Order = NonNullable<ReturnType<typeof parseOrder>>;
type Receipt = { order_id: string; total_cents: number };

const url = process.env.SUPABASE_URL?.trim();
const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY?.trim();
const secretKey = process.env.SUPABASE_SECRET_KEY?.trim();
export const isDemo = !url && !publishableKey && !secretKey;

async function dataApi(path: string, key: string | undefined, body?: object) {
  if (!url || !key) throw new Error("Supabase configuration is incomplete.");
  return fetch(new URL("/rest/v1/" + path, url), {
    method: body ? "POST" : "GET",
    headers: { apikey: key, ...(body && { "Content-Type": "application/json" }) },
    body: body && JSON.stringify(body),
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
}

export async function getProducts(): Promise<Product[]> {
  if (isDemo) return catalog;
  const fields = "id,name,category,description,image_path,price_cents,sort_order";
  const response = await dataApi("products?select=" + fields + "&available=eq.true&order=sort_order.asc,id.asc", publishableKey);
  if (!response.ok) throw new Error("The catalog could not be loaded.");
  return response.json();
}

export async function submitOrder(order: Order): Promise<Receipt> {
  if (isDemo) {
    let total = 0;
    for (const item of order.items) {
      const product = catalog.find(({ id }) => id === item.id);
      if (!product) throw new Error("item_unavailable");
      if (product.price_cents !== item.unit_price_cents) throw new Error("price_changed");
      total += product.price_cents * item.quantity;
    }
    return { order_id: randomUUID(), total_cents: total };
  }
  if (!publishableKey) throw new Error("Supabase configuration is incomplete.");
  const response = await dataApi("rpc/submit_order", secretKey, {
    p_request_id: order.requestId,
    p_name: order.name,
    p_phone: order.phone,
    p_address: order.address,
    p_items: order.items,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.code === "P0001" ? error.message : "order_failed");
  }
  const [receipt] = await response.json() as Receipt[];
  if (!receipt?.order_id || !Number.isInteger(receipt.total_cents)) throw new Error("order_failed");
  return receipt;
}
