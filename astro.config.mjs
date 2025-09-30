import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel'
import { loadEnv } from 'vite'

import react from '@astrojs/react'

import icon from 'astro-icon'

const { WEBSITE_URL } = loadEnv(process.env.NODE_ENV, process.cwd(), '')

// https://astro.build/config
export default defineConfig({
  site: WEBSITE_URL,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    icon(),
  ],
  adapter: vercel({
    edgeMiddleware: true,
  }),
  output: 'server',
})
