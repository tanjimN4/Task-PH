/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        TaskTheme: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#FF3811",
          secondary: "teal",

          ".btn-primary": {
            "color" : "#fff"
          },

          ".btn-outline.btn-primary:hover": {
            "color" : "#fff"
          },
        },
      },
      "light",
    ],
  },
};
