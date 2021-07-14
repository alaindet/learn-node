import { promises as fs } from 'fs';
import { join } from 'path';

export interface FilesystemCollection<T = any> {
  name: string;
  path: string;
  data: T[];
}

export class FilesystemStorageService {

  collections: { [collectionName: string]: FilesystemCollection };

  createCollection<T = any>(name: string, _path: string): void {
    const path = join(__dirname, '..', '..', _path);
    const data: T[] = [];
    const collection = { name, path, data };
    this.collections[name] = collection;
  }

  async storeCollection<T = any>(
    name: string,
    data: T[],
  ): Promise<void> {
    const { path } = this.collections[name];
    await fs.writeFile(path, JSON.stringify(data));
  }

  async getCollection<T = any>(name: string): Promise<T[]> {
    const { path } = this.collections[name];
    const data = await fs.readFile(path, { encoding: 'utf8' });
    return JSON.parse(data);
  }
}
