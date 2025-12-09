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
      desktopM: '1440px',
      desktopL: '1680px',
    },
    colors: {
      white: '#FFFFFF',
      black: { light: '#B2BAC2', default: '#000', strong: '#6F7E8C' },
      grey: { light: '#FFFFFF61', default: '#1E1E1E', strong: '#343434' },
      pink: '#FADADD',
      yellow: { light: '#FFDC97', default: '#FFA800' },
    },
    fontFamily: {
      inter: ['var(--font-inter)'],
    },
    fontSize: {
      '10': '10px',
      '12': '12px',
      '14': '14px',
      '16': '16px',
      '17': '17px',
      '18': '18px',
      '20': '20px',
      '32': '32px',
      '40': '40px',
      '48': '48px',
      '56': '56px',
    },
    fontWeight: {
      light: '200',
      basic: '400',
      bold: '700',
      'super-bold': '900',
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
}
export default config
