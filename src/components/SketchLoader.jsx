import { useEffect } from 'react';

// Use Vite's glob import to get all sketches
const sketches = import.meta.glob('/src/content/sketches/**/*.js');

export default function SketchLoader({ sketchPath, containerId }) {
    useEffect(() => {
        // Find the full path that matches our sketch filename
        const fullPath = Object.keys(sketches).find(path => path.endsWith(sketchPath));

        if (fullPath) {
            sketches[fullPath]()
                .then(module => {
                    console.log('Sketch loaded successfully:', fullPath);
                })
                .catch(error => {
                    console.error('Failed to load sketch:', error);
                });
        } else {
            console.error(`Couldn't find sketch: ${sketchPath}`);
        }
    }, [sketchPath]);

    return <div id={containerId} style={{ width: '100%', height: '400px' }}></div>;
}