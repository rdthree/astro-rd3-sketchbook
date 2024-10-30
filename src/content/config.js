// src/content/config.ts
import { z, defineCollection } from 'astro:content';
export const collections = {
    sketches: defineCollection({
        type: 'content'
    })
};
