import { ConfigEnv, defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const pwaOptions = (a: ConfigEnv): Partial<VitePWAOptions> => ({
  registerType: "autoUpdate",
  mode: a.mode === "production" ? "production" : "development",
  includeAssets: ["favicon.svg"],
  workbox: {
    clientsClaim: true,
    skipWaiting: true,
    globPatterns: ["**/*.{css,html,png}"],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/mg-portfolio.s3.amazonaws.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "s3-images",
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^https:\/\/www.apple.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "apple-images",
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      }
    ],
  },
  manifest: {
    name: "PWA Router",
    short_name: "PWA Router",
    theme_color: "rgba(0, 0, 0, 1)",
    icons: [
      {
        src: "pwa-192x192.png", // <== don't add slash, for testing
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/pwa-512x512.png", // <== don't remove slash, for testing
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "pwa-512x512.png", // <== don't add slash, for testing
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  },
  devOptions: {
    enabled: true,
    /* when using generateSW the PWA plugin will switch to classic */
    type: "module",
    navigateFallback: "index.html",
  },
});

// https://vitejs.dev/config/
export default defineConfig((a) => ({
  plugins: [svelte(), VitePWA(pwaOptions(a))],
}));
