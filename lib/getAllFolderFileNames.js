const { resolve } = require('path');
const { readdir } = require('fs').promises;

async function getAllFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getAllFiles(res) : res;
    })
  );
  return Array.prototype.concat(...files);
}

export async function getFiles(dir) {
  const files = await getAllFiles(dir);
  const basePath = resolve(dir) + '/';
  return files.map((file) => ({ params: { slug: file.replace(basePath, '').replace(/\.md$/, '').split('/') } }));
}
