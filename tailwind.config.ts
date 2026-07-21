import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        defcoms: {
          red: '#f22020',
          blue: '#0098b2',
          darkblue: '#005f7f',
        }
      },
    },
  },
  plugins: [],
}
export default config
