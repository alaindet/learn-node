import { FilesystemStorageService } from '@app/core/filesystem';
import { CreateMathomDto, UpdateMathomDto } from '../dtos';
import { Mathom } from '../entities';

export class MathomsRepository {

  name = 'mathoms';
  path = 'features/mathoms/storage/mathoms.json';

  constructor(private storage: FilesystemStorageService) {
    this.storage.createCollection(this.name, this.path);
  }

  async create(dto: CreateMathomDto): Promise<number> {
    const id = Date.now();
    const data = await this.fetchData();
    const item = { id, ...dto };
    data.push(item);
    await this.storeData(data);
    return id;
  }

  async getAll(): Promise<Mathom[]> {
    return await this.fetchData();
  }

  async get(id: number, existingData?: any[]): Promise<Mathom | null> {
    const data = existingData ?? await this.fetchData();
    const mathom = data.find(mathom => mathom.id === id);
    return mathom ?? null;
  }

  async update(id: number, dto: UpdateMathomDto): Promise<Mathom | null> {
    let data = await this.fetchData();
    let mathom = await this.get(id, data);

    if (mathom === null) {
      return null;
    }

    mathom = { ...mathom, ...dto, id };
    data = data.map(aMathom => aMathom.id === id ? mathom : aMathom);
    await this.storeData(data);

    return mathom;
  }

  async delete(id: number): Promise<Mathom | null> {

    let data = await this.storage.get();
    let mathom = await this.get(id, data);

    if (mathom === null) {
      return null;
    }

    data = data.filter(aMathom => aMathom.id !== id);
    await this.storage.store(data);

    return mathom;
  }

  private async fetchData(): Promise<Mathom[]> {
    return await this.storage.getCollection(this.name);
  }

  private async storeData(data: Mathom[]): Promise<void> {
    return await this.storage.storeCollection(this.name, data);
  }
}
