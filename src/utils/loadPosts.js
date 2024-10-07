// src/utils/loadPosts.js
// Utility function to retrieve all folders containing MDX files and their associated content
import fs from 'fs';
import path from 'path';

export function getAllPosts() {
  const contentDir = path.join(process.cwd(), 'content');
  const postFolders = fs.readdirSync(contentDir);

  return postFolders
    .filter((folder) => {
      const folderPath = path.join(contentDir, folder);
      const files = fs.readdirSync(folderPath);
      return files.some(file => path.extname(file).toLowerCase() === '.mdx');
    })
    .map((folder) => {
      const folderPath = path.join(contentDir, folder);
      const files = fs.readdirSync(folderPath);
      return {
        folder,
        files: files.map(file => path.join(folder, file))
      };
    });
}