import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/autoglow-website/',
  root: '.',

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
