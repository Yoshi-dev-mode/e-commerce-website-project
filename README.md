# Yoshiya storefront

Yoshiya is a food and drinks storefront built with Next.js and Supabase Postgres. The original 15 menu items, prices and product images are included.

## Run locally

Use Node.js 20.9 or later.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). With all Supabase variables unset, the store uses the bundled catalog and simulates checkout without storing the submitted details. The bag is stored in the browser.

```sh
npm run check
npm run build
```

## Connect the imported Supabase project

The schema and catalog are already applied to [Yoshiya Storefront](https://supabase.com/dashboard/project/nxxdelopqfkvioftavxb). Copy `.env.example` to `.env.local` and enter the following values from the project's API settings.

- `SUPABASE_URL` is `https://nxxdelopqfkvioftavxb.supabase.co`.
- `SUPABASE_PUBLISHABLE_KEY` uses the `sb_publishable_…` key.
- `SUPABASE_SECRET_KEY` uses the `sb_secret_…` key. Keep it server-side and out of source control.

Restart Next.js after saving the file. Supabase serves the catalog and stores order requests. Orders start as `received`. The store arranges payment after confirming an order request. Deploy the app with a Next.js server and the same environment variables.

## Apply the migrations to another project

1. Open a Supabase project intended for this store. The migrations create `products`, `orders` and `order_items` in the public schema. Review any existing tables with those names before applying them.
2. With the [Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started), run the commands below from this repository. Review the dry run before applying.

   ```sh
   supabase init
   supabase login
   supabase link --project-ref YOUR_PROJECT_REF
   supabase db push --dry-run
   supabase db push
   ```

   `supabase init` is only needed once. The first migration creates the schema and policies. The second imports the catalog.

3. Set `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` and `SUPABASE_SECRET_KEY` in `.env.local` using the new project's API settings. Restart Next.js and verify the menu loads.

## Data carried forward

- The migration carries over all 13 products found in the original PostgreSQL database and two additional drinks from the repository seed. The exact source records are retained in the private `legacy_record` column. The storefront uses standardized display names and shorter descriptions, and interprets the original dollar prices as USD.
- The original shared `variants` cart was empty when checked. The new app uses browser-local bags.
- Anonymous Supabase users can read available products. The checkout API submits orders through a server-only RPC. The RPC checks current prices and availability, creates the order and line items in one transaction, and returns the same receipt for a retry with the same request ID and details.
