// src/content/config.ts
// TODO: Astro has a problem with this astro:content import in this file, on GitHub already
// @ts-ignore
import {defineCollection} from 'astro:content';

export const collections = {
    sketches: defineCollection({
        type: 'content'
    })
};