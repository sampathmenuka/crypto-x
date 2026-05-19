import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F19',
        card: '#121826',
        primary: '#4bc6b9',
        secondary: '#73a5ff',
        'text-primary': '#FFFFFF',
        'text-secondary': '#94A3B8',
        border: '#1E293B',
        'accent-glow': 'rgba(75, 198, 185, 0.15)',
        up: '#4bc6b9',
        down: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
        'hero-gradient': 'radial-gradient(circle at top right, rgba(75, 198, 185, 0.05), transparent), radial-gradient(circle at bottom left, rgba(115, 165, 255, 0.05), transparent)',
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(75, 198, 185, 0.2)',
        'glow-secondary': '0 0 20px rgba(115, 165, 255, 0.2)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
} satisfies Config
