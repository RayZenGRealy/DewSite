import type { NextConfig } from "next";

/**
 * Cloudflare Pages deployment for the current static storefront.
 * When implementing server-side orders and protected admin routes,
 * remove output: "export" and migrate to Cloudflare Workers.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
};

export default nextConfig;
