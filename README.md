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
