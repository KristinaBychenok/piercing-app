import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    screens: {
      phone: '360px',
      tablet: '640px',
      laptop: '1024px',
      desktop: '1280px',
    },
    colors: {
      white: '#FFFFFF',
      black: { light: '#B2BAC2', default: '#000', strong: '#6F7E8C' },
      grey: '#FFFFFF61',
      pink: '#FADADD',
    },
    fontFamily: {
      inter: ['var(--font-inter)'],
    },
    fontSize: {
      '14': '14px',
      '16': '16px',
      '18': '18px',
      '20': '20px',
      '32': '32px',
      '40': '40px',
    },
    fontWeight: {
      light: '200',
      basic: '400',
      bold: '700',
      'super-bold': '900',
    },
  },
  plugins: [],
}
export default config
