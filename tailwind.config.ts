import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
      },
      colors: {
        dark: {
          bg: '#0a0a0a',
          surface: '#141414',
          border: '#2a2a2a',
          hover: '#1f1f1f',
        },
      },
    },
  },
  plugins: [],
};
export default config;
