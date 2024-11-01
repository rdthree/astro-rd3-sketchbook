// src/content/config.ts
// TODO: Astro has a problem with this astro:content import in this file, on GitHub already
// @ts-ignore
import { defineCollection, z } from 'astro:content';

const sketchesCollection = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
    })
});

export const collections = {
    'sketches': sketchesCollection,
};