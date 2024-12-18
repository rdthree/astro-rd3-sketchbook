// src/content.config.ts
import { defineCollection, z } from 'astro:content';

// Define a catch-all collection for all folders
const genericCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string().optional(), // Make schema flexible for any content
    }),
});

// Export all folders in 'src/content/' as a single collection
export const collections = {
    'sketches': genericCollection, // Existing folder
};
