import { useEffect } from 'react';

// Get all sketches using Vite's glob import
const sketches = import.meta.glob('/src/content/sketches/**/*.js');

export default function SketchLoader({ sketchPath, containerId }) {
    useEffect(() => {
        // Check environment in a more robust way
        const isDev = import.meta.env.DEV;
        const isProd = import.meta.env.PROD;

        console.log('Environment:', { isDev, isProd });

        const fullPath = Object.keys(sketches).find(path => path.endsWith(sketchPath));

        if (fullPath) {
            console.log('Found sketch at:', fullPath);

            sketches[fullPath]()
                .then(module => {
                    console.log('Sketch loaded successfully');
                })
                .catch(error => {
                    console.error('Failed to load sketch:', error, {
                        isDev,
                        isProd,
                        fullPath,
                        sketchPath
                    });
                });
        } else {
            console.error(`Couldn't find sketch: ${sketchPath}`, {
                availablePaths: Object.keys(sketches)
            });
        }
    }, [sketchPath]);

    return <div id={containerId} style={{ width: '100%', height: '400px' }}></div>;
}