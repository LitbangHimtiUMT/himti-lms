/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  // App is light-only. dark: utilities exist across components but must never
  // activate: withMT used to pin dark mode to the class strategy and no code
  // ever adds a .dark ancestor. Without this, Tailwind falls back to the
  // media strategy and an OS dark preference washes out text (white text on
  // light backgrounds). Keep the class strategy so rendering stays light.
  darkMode: "class",

  theme: {
    extend: {},
  },
  plugins: [],
};
