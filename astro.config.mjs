import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'

import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  adapter: vercel({
    edgeMiddleware: true,
  }),
  output: 'hybrid',
})
