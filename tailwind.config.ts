import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
import plugin from 'tailwindcss/plugin'

type RootTheme = {
  ':root': Record<`--twdc-${string}`, string>
}

const themes = {
  ':root': {
    '--twdc-primary': '#08FDD8',
    '--twdc-grayscale-50': '#FaF5F6',
    '--twdc-grayscale-100': '#E4E3E7',
    '--twdc-grayscale-200': '#C2C0C8',
    '--twdc-grayscale-300': '#A09CA9',
    '--twdc-grayscale-400': '#7D798A',
    '--twdc-grayscale-500': '#5D5A67',
    '--twdc-grayscale-600': '#3D3B43',
    '--twdc-grayscale-700': '#1D1C20',
    '--twdc-grayscale-800': '#131215',
    '--twdc-grayscale-900': '#09090A',
  },
} satisfies RootTheme

type ExtendColors = Record<
  string,
  Record<string, `var(${keyof (typeof themes)[':root']})`>
>

const themePlugin = plugin(({ addBase }) => {
  addBase(themes)
})

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      animation: {
        swipeUp: 'swipeUp 1.8s infinite ease-in-out',
      },
      fontFamily: {
        belle: ['"La Belle Aurore", sans-serif'],
        clvtc: ['clvtc, sans-serif'],
        iamono: ['"iA Writer Mono", monospace'],
      },
      colors: {
        primary: {
          DEFAULT: 'var(--twdc-primary)',
        },
        surface: {
          DEFAULT: 'var(--twdc-grayscale-500)',
          50: 'var(--twdc-grayscale-50)',
          100: 'var(--twdc-grayscale-100)',
          200: 'var(--twdc-grayscale-200)',
          300: 'var(--twdc-grayscale-300)',
          400: 'var(--twdc-grayscale-400)',
          500: 'var(--twdc-grayscale-500)',
          600: 'var(--twdc-grayscale-600)',
          700: 'var(--twdc-grayscale-700)',
          800: 'var(--twdc-grayscale-800)',
          900: 'var(--twdc-grayscale-900)',
        },
      } satisfies ExtendColors,
      keyframes: {
        swipeUp: {
          '0%': { transform: 'translateY(-44px)' },
          '10%': { transform: 'translateY(0px)' },
          '90%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(44px)' },
        },
      },
    },
  },
  plugins: [typography, themePlugin],
} satisfies Config
