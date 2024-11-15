// @ts-ignore // hopefully this is fixed later by Rider
import {defineConfig} from "astro/config";
import mdx from "@astrojs/mdx";
import {visualizer} from "rollup-plugin-visualizer";

export default defineConfig({
    site: 'https://rdthree.github.io',
    base: '/astro-rd3-sketchbook',
    integrations: [// Enables MDX support for enhanced Markdown capabilities
        mdx()],
    vite: {
        plugins: [visualizer()],
        optimizeDeps: {
            //include: ['babylonjs', 'babylonjs-loaders', '@babylonjs/gui', 'three', 'd3', 'p5'],
            //exclude: ['@babylonjs/core', '@babylonjs/inspector'],
        },
        build: {
            rollupOptions: {
                external: [], // Excludes the "fs" and "path" packages from the build so it can deploy to GitHub pages
                output: {
                    manualChunks: {
                        // Split Babylon.js into smaller chunks
                        'babylon-core': ['@babylonjs/core'],
                        'babylon-loaders': ['@babylonjs/loaders'],
                        'babylon-gui': ['@babylonjs/gui'],
                        'babylon-inspector': ['@babylonjs/inspector'],
                        threejs: ['three'],
                        d3: ['d3'],
                        p5: ['p5'],
                    },
                    assetFileNames: () => {
                        return 'assets/[name][extname]';
                    },
                },
            },
        },
        resolve: {
            alias: {
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