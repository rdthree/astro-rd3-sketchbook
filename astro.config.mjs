// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: 'https://rdthree.github.io',
  //base: '/astro-rd3-sketchbook',
  integrations: [
    mdx(), // Enables MDX support for enhanced Markdown capabilities
  ],
  vite: {
    optimizeDeps: {
      //include: ["@babylonjs/core"], // Excludes the "three" package from optimization
    },
    ssr: {
        //noExternal: ["@babylonjs/core"], // Excludes the "three" package from SSR
      },
    build: {
      rollupOptions: {
        external: ['fs', 'path'], // Excludes the "fs" and "path" packages from the build so it can deploy to github pages
          },
        },
    resolve: {
      alias: {
        //"@components": "/src/components", // Sets an alias for the components directory
        //"@babylonjs/core": "/node_modules/@babylonjs/core", // Sets an alias for the Babylon.js core package
      },
      
    }
  }, // Vite-specific configurations can be added here
  outDir: "dist", // Specifies the output directory for the built site
  publicDir: "public", // Defines the directory for static assets
  srcDir: "src", // Sets the source directory for Astro components and pages
  // Markdown configuration
  markdown: {
    shikiConfig: {
      theme: "snazzy-light", // Sets the syntax highlighting theme for code blocks
      defaultColor: "false",
    },
  },
});
