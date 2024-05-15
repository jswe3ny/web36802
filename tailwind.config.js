/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
    daisyui: {
      themes: [ "dark","light", "cmyk", "aqua"],
    }
  },
  plugins: [require('daisyui')],
}

