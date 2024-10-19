// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  integrations: [
    mdx(), // Enables MDX support for enhanced Markdown capabilities
  ],
  vite: {
    // resolve: {
    //   alias: {
    //     "@components": "", // Sets an alias for the components directory
    //   },
    // }
  }, // Vite-specific configurations can be added here
  outDir: "dist", // Specifies the output directory for the built site
  publicDir: "public", // Defines the directory for static assets
  srcDir: "src", // Sets the source directory for Astro components and pages
  // Markdown configuration
  markdown: {
    shikiConfig: {
      theme: "nord", // Sets the syntax highlighting theme for code blocks
    },
  },
});
