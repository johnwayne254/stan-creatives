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


## Backend foundation (Appwrite)

The project now uses the Appwrite JavaScript SDK. Configure the public endpoint and project ID through the `VITE_APPWRITE_*` values in `.env.example` (copy to `.env.local` for local development or configure them as GitHub Actions build variables for deployment).

Create a database and collections using the IDs in `.env.example`: `products`, `orders`, `order_items`, `design_requests`, and `payments`. Create an `artwork` storage bucket. Configure collection attributes and permissions before connecting live forms. Use Appwrite Auth for admin login and grant admin-only permissions to management operations. Never put an Appwrite API key in frontend environment variables or browser code; privileged operations must run in a trusted server/Function environment.

The Appwrite client scaffold is in `src/lib/appwrite.js`. The live website is not connected to the Appwrite project until its Project ID and endpoint are configured and the database collections, bucket, and permissions are created.
