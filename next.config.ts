import type { NextConfig } from "next";

/**
 * Current storefront has no backend. Export static HTML for Cloudflare
 * Workers static assets (wrangler.jsonc -> out/) or Cloudflare Pages.
 * Remove static export only when we implement a protected server backend.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
};

export default nextConfig;
