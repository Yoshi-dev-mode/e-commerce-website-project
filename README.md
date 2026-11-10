<h1 align="center">Yoshiya Storefront</h1>

<p align="center">
  A full-stack restaurant storefront, from menu discovery to order confirmation.
</p>

<p align="center">
  <strong>Next.js · React · TypeScript · Supabase Postgres</strong>
</p>

<p align="center">
  <a href="#try-it-locally">Try it locally</a> ·
  <a href="#engineering-highlights">Engineering highlights</a> ·
  <a href="#connect-supabase">Connect Supabase</a>
</p>

![Yoshiya storefront homepage with a warm cream layout and photographs of a burger, fried chicken, fries, and a mocha frappe](docs/storefront-preview.webp)

## The project

Yoshiya rebuilds an earlier food and drinks storefront around a complete ordering flow. Browse 15 menu items, filter by category or search by name, open product details, and add items to a bag that survives a refresh. Scroll through the featured burger to see its layers assemble from the original product photo.

## Engineering highlights

| Area | Implementation |
| --- | --- |
| **Motion and accessibility** | Scroll position drives the burger assembly. The section shows the assembled burger when reduced motion is enabled. [View component](components/burger-assembly.tsx) |
| **Demo without credentials** | A bundled catalog and simulated receipt let reviewers try the ordering flow locally. Demo orders do not store submitted details. [View data layer](lib/store.ts) |
| **Checkout validation** | The API validates contact details and quantities. Postgres rechecks availability and prices and writes the order and line items in one transaction. [View order route](app/api/orders/route.ts) |
| **Safe retries** | Submitting the same request ID with the same details returns the existing receipt. A reused ID with different details returns a conflict. [View SQL migration](supabase/migrations/20261109000100_storefront.sql) |
| **Data access** | Anonymous users can read available products. The server-side checkout uses a separate key to submit orders. [View access policies](supabase/migrations/20261109000100_storefront.sql) |

## Try it locally

Use Node.js 20.9 or later.

```sh
git clone --branch codex/storefront-rebuild https://github.com/Yoshi-dev-mode/e-commerce-website-project.git
cd e-commerce-website-project
npm ci
npm run dev
```

Open the storefront with all Supabase variables unset to start in demo mode. Add an item, refresh to check that the bag persists, then submit an order with sample details to see the receipt. [Open localhost:3000](http://localhost:3000)

```sh
npm run check
npm run build
```

## Connect Supabase

Use a Supabase project with the storefront schema and seed data applied. For a new project, link it with the Supabase CLI, review the dry run, and apply the two migrations. [View migrations](supabase/migrations)

```sh
supabase init
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase db push --dry-run
supabase db push
```

Run `supabase init` once if the checkout lacks a Supabase configuration. Copy `.env.example` to `.env.local`, fill in the following values from your Supabase project settings, and restart Next.js. [View environment template](.env.example)

| Variable | Purpose |
| --- | --- |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_PUBLISHABLE_KEY` | Catalog read access |
| `SUPABASE_SECRET_KEY` | Server-only order submission. Keep this key out of source control. |

Orders enter the database with a `received` status. The store arranges payment after confirming the request. Deploy with a Next.js server and the same environment variables.

<details>
<summary>Catalog migration notes</summary>

The seed carries forward 13 products from the earlier PostgreSQL database and two drinks from the repository seed. It retains the source records in the restricted `legacy_record` column, standardizes display names, shortens descriptions, and interprets the original dollar prices as USD. The rebuilt storefront stores each bag in the shopper's browser.

</details>
