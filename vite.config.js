import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// base "./" supaya hasil build bisa ditaruh di root domain maupun subfolder
export default defineConfig({ plugins: [react()], base: "./" });
