// Tema hitam-putih: semua warna berwarna diubah jadi abu-abu/putih (mengikuti foto latar)
const Z = { 50: "#fafafa", 100: "#f4f4f5", 200: "#e4e4e7", 300: "#d4d4d8", 400: "#a1a1aa", 500: "#71717a", 600: "#52525b", 700: "#3f3f46", 800: "#27272a", 900: "#18181b", 950: "#09090b" };

export default {
  content: ["./index.html", "./*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        accent: { DEFAULT: "#ffffff", light: "#e4e4e7" },
        slate: Z, sky: { ...Z, 300: "#e4e4e7", 400: "#ffffff" },
        indigo: Z, cyan: Z, emerald: Z, pink: Z, orange: Z, rose: Z, red: Z, yellow: Z, green: Z,
      },
      fontFamily: {
        sans: ["Open Sans", "system-ui", "sans-serif"],
        head: ["Oswald", "Impact", "sans-serif"],
      },
      keyframes: { blink: { "50%": { opacity: "0" } } },
      animation: { blink: "blink 1s steps(1) infinite" },
    },
  },
  plugins: [],
};
