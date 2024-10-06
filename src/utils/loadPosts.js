// src/utils/loadPosts.js
import fs from 'fs';
import path from 'path';

// Function to load all posts
export function getAllPosts() {
  // Read the content directory
  const contentDir = path.join(process.cwd(), 'content');
  const postFolders = fs.readdirSync(contentDir);

  return postFolders
    .filter((folder) => {
      // Check if folder contains an MDX file
      return fs.existsSync(path.join(contentDir, folder, 'sketch.mdx'));
    })
    .map((folder) => {
      const postFilePath = path.join(contentDir, folder, 'sketch.mdx');
      const postContent = fs.readFileSync(postFilePath, 'utf8');

      return {
        folder,
        content: postContent,
      };
    });
}
