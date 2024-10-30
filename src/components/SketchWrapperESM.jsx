// src/components/SketchWrapperESM.jsx

import { useEffect } from 'react';

// Get all sketches using Vite's glob import
const sketches = import.meta.glob('/src/content/sketches/**/*.js', { eager: false });

export default function SketchLoader({ sketchPath, containerId }) {
    useEffect(() => {
        const baseURL = import.meta.env.BASE_URL;

        // Adjust the path accordingly
        const adjustedSketches = {};
        for (const [key, value] of Object.entries(sketches)) {
            const adjustedKey = baseURL + key.slice(1); // Remove leading '/' and prepend baseURL
            adjustedSketches[adjustedKey] = value;
        }

        const fullPath = Object.keys(adjustedSketches).find((path) =>
            path.endsWith(sketchPath)
        );

        if (fullPath) {
            console.log('Loading sketch from:', fullPath);

            adjustedSketches[fullPath]()
                .then((module) => {
                    console.log('Sketch loaded successfully');
                    // You can initialize your sketch here using the loaded module
                })
                .catch((error) => {
                    console.error('Failed to load sketch:', error, {
                        fullPath,
                        sketchPath,
                        availablePaths: Object.keys(adjustedSketches),
                    });
                });
        } else {
            console.error(`Couldn't find sketch: ${sketchPath}`, {
                availablePaths: Object.keys(adjustedSketches),
            });
        }
    }, [sketchPath]);

    return <div id={containerId}></div>;
}
