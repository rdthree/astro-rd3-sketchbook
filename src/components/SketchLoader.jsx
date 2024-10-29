import { useEffect } from 'react';

// Get all sketches using Vite's glob import
const sketches = import.meta.glob('/src/content/sketches/**/*.js', { eager: false });

export default function SketchLoader({ sketchPath, containerId }) {
    useEffect(() => {
        const isDev = import.meta.env.DEV;
        const isProd = import.meta.env.PROD;

        // Adjust path based on environment
        const basePath = isProd ? '/astro-rd3-sketchbook' : '';
        const adjustedPath = `/src/content/sketches/${sketchPath}`;

        const fullPath = Object.keys(sketches).find(path => path.endsWith(sketchPath));

        if (fullPath) {
            console.log('Loading sketch from:', fullPath);

            sketches[fullPath]()
                .then(module => {
                    console.log('Sketch loaded successfully');
                })
                .catch(error => {
                    console.error('Failed to load sketch:', error, {
                        isDev,
                        isProd,
                        fullPath,
                        sketchPath,
                        availablePaths: Object.keys(sketches)
                    });
                });
        } else {
            console.error(`Couldn't find sketch: ${sketchPath}`, {
                availablePaths: Object.keys(sketches)
            });
        }
    }, [sketchPath]);

    return <div id={containerId}></div>;
}