// @ts-ignore // hopefully this is fixed later by Rider
import {defineConfig} from "astro/config";

import mdx from "@astrojs/mdx";
import {visualizer} from "rollup-plugin-visualizer";
export default defineConfig({
    site: 'https://rdthree.github.io',
    base: '/astro-rd3-sketchbook',
    integrations: [mdx()],
    vite: {
        plugins: [visualizer()],
        build: {
            sourcemap: false,
            target: 'esnext',
            minify: 'esbuild',
            cssMinify: false,
            reportCompressedSize: false,
            chunkSizeWarningLimit: 1000,
            rollupOptions: {
                output: {
                    manualChunks: {
                        'babylon': ['@babylonjs/core'],
                        'three': ['three'],
                        'd3': ['d3'],
                        'p5': ['p5']
                    }
                }
            }
        },
        optimizeDeps: {
            include: ['@babylonjs/core', 'babylonjs', 'babylonjs-loaders', 'three', 'd3', 'p5'],
            esbuildOptions: {
                target: 'esnext',
                treeShaking: true,
            }
        },
        cacheDir: 'node_modules/.vite/vite_cache',
    },
    markdown: {
        shikiConfig: {
            theme: "snazzy-light",
            defaultColor: "false",
        },
    },
});