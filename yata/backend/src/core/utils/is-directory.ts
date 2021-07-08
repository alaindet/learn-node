import { promises as fs } from 'fs';

export async function isDirectory(dirPath: string): Promise<boolean> {
  try {
    const stat = await fs.lstat(dirPath);
    return stat.isDirectory();
  } catch (err) {
    return false;
  }
}
