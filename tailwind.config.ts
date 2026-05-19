import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "eva-red": "#FF0000",
        "eva-purple": "#660099",
        "eva-bg": "#0a0a0a",
        "eva-black": "#000000",
        "eva-unit01": "#6A0572",
        "eva-unit02": "#FF0000",
        "eva-unit00": "#0000FF",
        "eva-unit03": "#00AA00",
        "eva-unit05": "#FF6600",
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "'Fira Code'", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
