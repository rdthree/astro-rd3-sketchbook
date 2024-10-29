import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import react from "@astrojs/react";

export default defineConfig({
  site: 'https://rdthree.github.io',
  //base: '/astro-rd3-sketchbook',
  integrations: [// Enables MDX support for enhanced Markdown capabilities
  mdx(), react()],
  vite: {
    optimizeDeps: {
    },
    ssr: {
      },
    build: {
      rollupOptions: {
        external: ['fs', 'path'], // Excludes the "fs" and "path" packages from the build so it can deploy to github pages
        output: {
          manualChunks: {
            babylonjs: ['@babylonjs/core', '@babylonjs/loaders', '@babylonjs/gui', '@babylonjs/inspector'],
            threejs: ['three'],
            d3: ['d3'],
            p5: ['p5'],
          },
          assetFileNames: (assetInfo) => {
              if (assetInfo.name === 'SketchLoader.js') {
                  return 'assets/[hash].[extname]';
              }
              return 'assets/[name][extname]';
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': 'src',
        '@SketchLoader': 'src/components/SketchLoader.jsx',
      },
    }
  }, // Vite-specific configurations can be added here
  output: "static", // Specifies the output format for the built site
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