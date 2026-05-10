import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:        '#0a0e1a',
        surface:   '#0f1629',
        surface2:  '#151e35',
        border:    '#1e2d4a',
        border2:   '#243352',
        primary:   '#3b82f6',
        accent:    '#06b6d4',
        'text-1':  '#e2e8f0',
        'text-2':  '#94a3b8',
        'text-3':  '#475569',
        up:        '#22c55e',
        down:      '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config
