import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
import plugin from 'tailwindcss/plugin'
import twAnimate from 'tailwindcss-animate'

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
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 0px 12px var(--tw-shadow-color)',
      },
      dropShadow: ({ theme }) => ({
        primary: `0 0 12px ${theme('colors.primary.DEFAULT')}`,
      }),
      textUnderlineOffset: {
        3: '3px',
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
      animation: {
        swipeUp: 'swipeUp 1.8s infinite ease-in-out',
        marquee: 'marquee linear alternate',
        'audio-wave': 'audio-wave 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        swipeUp: {
          '0%': { transform: 'translateY(-44px)' },
          '10%': { transform: 'translateY(0px)' },
          '90%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(44px)' },
        },
        marquee: {
          from: { transform: 'translateX(0%)' },
          '90%,100%': { transform: 'translateX(var(--marquee-x))' },
        },
        'audio-wave': {
          '0%, 100%': {
            height: '4px',
            transform: 'translateY(11px)',
          },
          '50%': {
            height: '26px',
            transform: 'translateY(0px)',
          },
        },
      },
    },
  },
  plugins: [
    typography,
    themePlugin,
    twAnimate,
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animation-delay': (value) => {
            return {
              'animation-delay': value,
            }
          },
        },
        {
          values: theme('transitionDelay'),
        }
      )
    }),
  ],
} satisfies Config
