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
        primary: '#00FFA3',
        secondary: '#3B82F6',
        'text-primary': '#FFFFFF',
        'text-secondary': '#94A3B8',
        border: '#1E293B',
        'accent-glow': 'rgba(0, 255, 163, 0.15)',
        up: '#22C55E',
        down: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
        'hero-gradient': 'radial-gradient(circle at top right, rgba(0, 255, 163, 0.05), transparent), radial-gradient(circle at bottom left, rgba(59, 130, 246, 0.05), transparent)',
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(0, 255, 163, 0.2)',
        'glow-secondary': '0 0 20px rgba(59, 130, 246, 0.2)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
} satisfies Config
