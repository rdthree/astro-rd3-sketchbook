// src/components/SketchWrapperESM.jsx

import { useEffect } from 'react';

// Use relative paths for glob imports
const sketches = import.meta.glob('../content/sketches/**/*.js', { eager: false });

export default function SketchLoader({ sketchPath, containerId }) {
    useEffect(() => {
        const baseURL = import.meta.env.BASE_URL; // Automatically set by Astro based on `base` config

        // Find the full path of the sketch
        const fullPath = Object.keys(sketches).find((path) =>
            path.endsWith(sketchPath)
        );

        if (fullPath) {
            console.log('Loading sketch from:', fullPath);

            sketches[fullPath]()
                .then((module) => {
                    console.log('Sketch loaded successfully');
                    // Initialize your sketch here using the loaded module
                })
                .catch((error) => {
                    console.error('Failed to load sketch:', error, {
                        fullPath,
                        sketchPath,
                        availablePaths: Object.keys(sketches),
                    });
                });
        } else {
            console.error(`Couldn't find sketch: ${sketchPath}`, {
                availablePaths: Object.keys(sketches),
            });
        }
    }, [sketchPath]);

    return <div id={containerId}></div>;
}
