import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/autoglow-website/',
  root: '.',

  // ── Expose to local network so you can test on your phone ──────────
  // Run: npm run dev
  // Then open http://<YOUR-PC-IP>:5173 on your phone (same WiFi)
  server: {
    host: true,       // binds to 0.0.0.0 — exposes to LAN
    port: 5173,
    open: false,
  },

  // ── Build config ───────────────────────────────────────────────────
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main:    resolve(__dirname, 'index.html'),
        services: resolve(__dirname, 'services.html'),
        about:   resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        terms:   resolve(__dirname, 'terms.html'),
      },
    },
  },
})
