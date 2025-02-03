import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

export default defineConfig({
  base: "/noroff-fed-pe2/",
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});
