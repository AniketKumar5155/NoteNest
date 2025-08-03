// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
 safelist: [
  {
    pattern: /^(hover:)?bg-(red|orange|amber|yellow|green|blue|indigo|purple|pink|brown|gray|black|cyan|lime|teal)-(100|200|300|400|500|600|700|800|900)$/,
    variants: ['hover'],
  },
],

  theme: {
    extend: {
      animation: {
        'slide-in': 'slideIn 0.3s ease-out forwards',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
