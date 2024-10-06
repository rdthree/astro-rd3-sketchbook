// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  integrations: [
    mdx(), // Enables MDX support
  ],
  vite: {},
  outDir: "dist",
  publicDir: "public",
  srcDir: "src",
  // Ensure the content folder is accessible
  markdown: {
    shikiConfig: {
      theme: "nord", // Optional: Set a syntax highlighting theme
    },
  },
});
