// src/utils/loadPosts.js
// Utility function to retrieve all folders containing MDX files from the content directory
import fs from 'fs';
import path from 'path';

export function getAllPosts() {
  const contentDir = path.join(process.cwd(), 'content');
  const folders = fs.readdirSync(contentDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  return folders.map(folder => ({ folder }));
}