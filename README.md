# Stan Creatives storefront

An editorial, responsive merchandise storefront for original designs and custom apparel.

## Run locally

1. Install Node.js LTS.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open the Vite URL shown in the terminal.

## Prototype features

- Responsive homepage and mobile navigation
- Category filtering and interactive product rail
- Product quick view with size and colour selection
- Cart drawer and quantity controls
- KES/USD display toggle (USD display is illustrative only)
- Custom merchandise request form with artwork upload input

## Not yet production-ready

This is a front-end prototype. It does not yet process payments, reserve inventory, calculate live exchange rates or shipping, securely store uploaded artwork, create customer orders, or send newsletter/custom-request emails. Do not accept live orders until these are connected and tested.

## Deployment

The included GitHub Actions workflow builds the Vite app and publishes `dist/` to GitHub Pages when enabled in repository settings.


## Backend foundation (Supabase)

A Supabase schema and optional client scaffold are included. This is not connected to production yet.

1. Create a Supabase project.
2. Open SQL Editor and run `supabase/schema.sql`.
3. Copy `.env.example` to `.env.local` and set the project URL and anon key.
4. Never place a Supabase service-role key in the browser or GitHub Pages.
5. Before live orders, add server-side/Edge Functions for order submission, artwork uploads, payment callbacks, and admin actions. Add authentication and admin-role policies first.

The database currently has tables for products, orders, order items, design requests, and payments. Row Level Security is enabled. Only active products are publicly readable; customer/order tables intentionally have no public access policies yet.
