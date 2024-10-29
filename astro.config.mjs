import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'
import { loadEnv } from 'vite'

import react from '@astrojs/react'

const { WEBSITE_URL } = loadEnv(process.env.NODE_ENV, process.cwd(), '')

// https://astro.build/config
export default defineConfig({
  site: WEBSITE_URL,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  adapter: vercel({
    edgeMiddleware: true,
  }),
  output: 'server',
})
