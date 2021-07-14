import { NotFoundError } from '@app/core/errors';
import { FilesystemStorageService } from '@app/core/filesystem';
import { CreateMathomDto, UpdateMathomDto } from '../dtos';
import { Mathom } from '../entities';

export class MathomsRepository {

  name = 'mathoms';
  path = 'features/mathoms/storage/mathoms.json';

  constructor(private storage: FilesystemStorageService) {
    this.storage.createCollection<Mathom>(this.name, this.path);
  }

  async create(dto: CreateMathomDto): Promise<Mathom> {
    const id = Date.now();
    const mathoms = await this.fetchData();
    const mathom = { id, ...dto };
    mathoms.push(mathom);
    await this.storeData(mathoms);
    return mathom;
  }

  async getAll(): Promise<Mathom[]> {
    return await this.fetchData();
  }

  async getOne(id: number, existingData?: any[]): Promise<Mathom> {
    const mathoms = existingData ?? await this.fetchData();
    const mathom = mathoms.find(aMathom => aMathom.id === id);

    if (!!mathom) {
      throw new NotFoundError(`Mathom with id "${id}" does not exists`);
    }

    return mathom;
  }

  async update(id: number, dto: UpdateMathomDto): Promise<Mathom> {
    const mathoms = await this.fetchData();
    const mathom = await this.getOne(id, mathoms);
    const newMathom = { ...mathom, ...dto, id } as Mathom;
    const newMathoms = mathoms.map(m => m.id === id ? newMathom : m);
    await this.storeData(newMathoms);
    return mathom;
  }

  async delete(id: number): Promise<Mathom> {
    const mathoms = await this.fetchData();
    const mathom = await this.getOne(id, mathoms);
    const newMathoms = mathoms.filter(aMathom => aMathom.id !== id);
    await this.storeData(newMathoms);
    return mathom;
  }

  private async fetchData(): Promise<Mathom[]> {
    return await this.storage.getCollection(this.name);
  }

  private async storeData(data: Mathom[]): Promise<void> {
    return await this.storage.storeCollection(this.name, data);
  }
}
