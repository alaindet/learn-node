import { FilesystemStorageService } from '@app/core/filesystem';
import { CreateMathomDto, UpdateMathomDto } from '../dtos';
import { Mathom } from '../entities';

export class MathomsRepository {

  constructor(private storage: FilesystemStorageService) {
    this.storage.setPath('features/mathoms/storage/mathoms.json');
  }

  async create(dto: CreateMathomDto): Promise<number> {
    const id = Date.now();
    const data = await this.storage.get();
    const item = { id, ...dto };
    data.push(item);
    await this.storage.store(data);

    return id;
  }

  async getAll(): Promise<Mathom[]> {
    return await this.storage.get();
  }

  async get(id: number, existingData?: any[]): Promise<Mathom | null> {
    const data = !!existingData ? existingData : await this.storage.get();
    const mathom = data.find(mathom => mathom.id === id);
    return !!mathom ? mathom : null;
  }

  async update(id: number, dto: UpdateMathomDto): Promise<Mathom | null> {

    let data = await this.storage.get();
    let mathom = await this.get(id, data);

    if (mathom === null) {
      return null;
    }

    mathom = { ...mathom, ...dto, id };
    data = data.map(aMathom => aMathom.id === id ? mathom : aMathom);
    await this.storage.store(data);

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
}
