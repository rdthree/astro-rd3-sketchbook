// src/utils/loadPosts.js
// Utility function to retrieve all folders containing MDX files from the content directory
import fs from 'fs';
import path from 'path';

export function getAllPosts() {
  // Define the path to the content directory
  const contentDir = path.join(process.cwd(), 'content');
  
  // Read all folders in the content directory
  const postFolders = fs.readdirSync(contentDir);

  return postFolders
    // Filter folders that contain at least one MDX file
    .filter((folder) => {
      const folderPath = path.join(contentDir, folder);
      const files = fs.readdirSync(folderPath);
      // Check if any file in the folder has a .mdx extension (case-insensitive)
      return files.some(file => path.extname(file).toLowerCase() === '.mdx');
    })
    // Map each folder to an object containing the folder name
    .map((folder) => {
      return { folder };
    });
}