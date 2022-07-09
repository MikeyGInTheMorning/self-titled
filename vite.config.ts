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
  },
  manifest: {
    name: "PWA Router",
    short_name: "PWA Router",
    theme_color: "#ffffff",
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
