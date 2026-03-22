/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        dm: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        base:   '#0f1923',
        base2:  '#1c2d3d',
        cyan:   '#00d4ff',
        ice:    '#f4f8fb',
        wa:     '#25D366',
        'wa-dk':'#128C7E',
      },
      keyframes: {
        fadeUp:    { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'none' } },
        iconIn:    { from: { opacity: '0', transform: 'scale(0.3)' },       to: { opacity: '1', transform: 'scale(1)' } },
        livePulse: { '0%,100%': { boxShadow: '0 0 0 3px rgba(74,222,128,0.22)' }, '50%': { boxShadow: '0 0 0 9px rgba(74,222,128,0.06)' } },
        fdPulse:   { '0%,100%': { opacity: '0.35', transform: 'scale(1)' }, '50%': { opacity: '1', transform: 'scale(1.7)' } },
        pop:       { from: { opacity: '0', transform: 'scale(0.5)' },        to: { opacity: '1', transform: 'scale(1)' } },
      },
      animation: {
        fadeUp:    'fadeUp 0.6s ease both',
        iconIn:    'iconIn 0.9s cubic-bezier(0.34,1.56,0.64,1) both',
        livePulse: 'livePulse 2s ease-in-out infinite',
        fdPulse:   'fdPulse 3s ease-in-out infinite',
        pop:       'pop 0.5s cubic-bezier(0.34,1.56,0.64,1) both',
      },
    },
  },
  plugins: [],
}
