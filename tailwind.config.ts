import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)'
      },
      borderRadius: {
        site: 'var(--radius)'
      },
      boxShadow: {
        premium: '0 16px 48px color-mix(in oklab, var(--foreground) calc(var(--shadow-intensity) * 12%), transparent)'
      },
      maxWidth: {
        container: 'var(--container-width)'
      },
      spacing: {
        section: 'var(--section-spacing)'
      }
    }
  },
  plugins: []
};

export default config;
