import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// ==========================================================================
// 1) VITE CONFIGURATION
// Purpose: Configurer Vite pour un build React optimisé pour GitHub/Vercel.
// Key variables: plugin React actif.
// Logic flow: defineConfig -> plugins -> export.
// ==========================================================================
export default defineConfig({
  plugins: [react()],
  // ==========================================================================
  // Runtime env exposure for frontend webhook
  // Purpose: Rendre GAS_URL_CONTACT disponible côté client sans préfixe VITE_.
  // Key variables: process.env.GAS_URL_CONTACT, import.meta.env.GAS_URL_CONTACT.
  // Logic flow: Vercel env -> define() compile-time injection -> frontend fetch URL.
  // ==========================================================================
  define: {
    "import.meta.env.GAS_URL_CONTACT": JSON.stringify(
      process.env.GAS_URL_CONTACT || ""
    ),
  },
  build: {
    rollupOptions: {
      // ==========================================================================
      // Multi-page build entries
      // Purpose: Générer à la fois la homepage et la page VCard.
      // Key variables: input index + vcard.
      // Logic flow: Rollup traite chaque HTML comme point d'entrée de build.
      // ==========================================================================
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        vcard: fileURLToPath(new URL("./vcard.html", import.meta.url)),
      },
    },
  },
});
