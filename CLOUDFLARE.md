# DEW · Cloudflare deployment

The current DewSite is a **static** Next.js storefront. Its Next.js config uses `output: "export"`; running `npm run build` produces static files in `out/`.

## Existing Cloudflare Workers project (dewsite)

Cloudflare's import flow may have created a **Worker** instead of a **Pages** project. This repository now contains `wrangler.jsonc`, which explicitly deploys `./out` as Worker **static assets**. This prevents Wrangler's automatic migration into OpenNext, which caused the previous `pages-manifest.json` build error.

In Cloudflare → **Workers & Pages** → **dewsite** → **Settings / Builds**, use:

- Git repository: `RayZenGRealy/DewSite`
- Production branch: `main`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: `/` (repository root)
- Node.js: 22 or 24 (Cloudflare detected Node 24 previously)

Do **not** use `bunx opennextjs-cloudflare build` or set the build output to `.next` for this static Worker deployment. `wrangler.jsonc` points at `out`.

If Git integration is connected, a push to `main` normally triggers a new build/deployment. You can also go to **Deployments** and retry using the latest commit. An active Worker publishes at a `*.workers.dev` address if the workers.dev route is enabled.

## Alternative: create Cloudflare Pages project

If you prefer a `*.pages.dev` domain, create a separate Pages project:

1. Go to **Workers & Pages** → **Create** → **Pages** → **Import an existing Git repository**.
2. Choose `RayZenGRealy/DewSite`, production branch `main`.
3. Framework: `Next.js (Static HTML Export)`.
4. Build command: `npm run build`.
5. Build output directory: `out`.

**Do not run `npx wrangler deploy` as the Pages build/deploy step.** Cloudflare Pages handles deployment of `out` automatically.

## Future admin access by email

At this stage, product data and prices are examples, jewelry graphics are illustrations, the cart only persists in the browser, and checkout does not send personal data or place orders.

When adding protected server-side admin access, real product storage, inventory, orders and payments, we will migrate off the static export to a supported full-stack Worker runtime. Admin email allowlists, login verification, secrets and authorization checks belong **on the server**. Do not publish admin emails, credentials, or tokens in the public repository.

Official docs:
- https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/
- https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/
