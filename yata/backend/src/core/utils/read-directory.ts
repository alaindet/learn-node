import { promises as fs } from 'fs';

export async function readDirectory(path: string): Promise<string[]> {

  const absolutePaths = [];
  const relativePaths = await fs.readdir(path);

  for (const relativePath of relativePaths) {
    absolutePaths.push(`${path}/${relativePath}`);
  }

  return absolutePaths;
}
