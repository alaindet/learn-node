import { promises as fs } from 'fs';
import { join } from 'path';

export class FilesystemStorageService {

  path: string;

  setPath(path: string): void {
    this.path = join(__dirname, '..', '..', path);
  }

  async store(data: any[]): Promise<void> {
    await fs.writeFile(this.path, JSON.stringify(data));
  }

  async get(): Promise<any[]> {
    const rawData = await fs.readFile(this.path, { encoding: 'utf8' });
    return JSON.parse(rawData);
  }
}
