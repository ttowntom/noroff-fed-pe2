import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4173/noroff-fed-pe2/",
    env: {
      cypressUser: process.env.VITE_CYPRESS_USER,
      cypressEmail: process.env.VITE_CYPRESS_EMAIL,
      cypressPassword: process.env.VITE_CYPRESS_PASSWORD,
    },
    setupNodeEvents() {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
