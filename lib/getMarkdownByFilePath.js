import fs from 'fs';
import { join } from 'path';

export function getMarkdown(directory, slug) {
  const fullDirectory = join(process.cwd(), directory);
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(fullDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  return fileContents;
}
