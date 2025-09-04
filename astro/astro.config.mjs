// astro.config.mjs
import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  output: 'server',
  adapter: cloudflare(), // ← Cloudflare Pages/Workers
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)), // import '@/...'
      },
    },
  },
})
