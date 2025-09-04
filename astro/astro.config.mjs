// astro.config.mjs
import { defineConfig } from 'astro/config'
import node from '@astrojs/node'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)), // import '@/...'
      },
    },
  }
})
