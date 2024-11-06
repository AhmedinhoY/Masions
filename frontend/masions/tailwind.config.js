import aspectRatio from '@tailwindcss/aspect-ratio';
import withMT from "@material-tailwind/react/utils/withMT";


/** @type {import('tailwindcss').Config} */

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
          sans: ['var(--font-geist-sans)'],
        },
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
    },
  },
  plugins: [
    aspectRatio,
  ],
});

