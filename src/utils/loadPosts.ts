// src/utils/loadPosts.ts

import * as fs from 'fs';
import path from 'path';

// Define an interface for the post object
interface Post {
  folder: string;
}

/**
 * Retrieves all folders containing MDX files from the content directory
 * @returns An array of Post objects
 */
export function getAllPosts(): Post[] {
  // Get the absolute path to the content directory
  const contentDir: string = path.join(process.cwd(), 'content');

  // Read the content directory and filter for directories only
  const folders: string[] = fs.readdirSync(contentDir, { withFileTypes: true })
    .filter((dirent): boolean => dirent.isDirectory())
    .map((dirent): string => dirent.name);

  // Map each folder name to a Post object
  return folders.map((folder): Post => ({ folder }));
}