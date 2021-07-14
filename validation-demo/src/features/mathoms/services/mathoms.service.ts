import { CreateMathomDto, UpdateMathomDto } from '../dtos';
import { Mathom } from '../entities';
import { MathomsRepository } from '../repositories';

export class MathomsService {

  constructor(
    private repository: MathomsRepository
  ) {}

  async create(dto: CreateMathomDto): Promise<Mathom> {
    return await this.repository.create(dto); 
  }

  async getAll(): Promise<Mathom[]> {
    return await this.repository.getAll();
  }

  async getOne(_id: string): Promise<Mathom | null> {
    const id = Number(_id);
    return await this.repository.getOne(id);
  }

  async update(_id: string, dto: UpdateMathomDto): Promise<Mathom> {
    const id = Number(_id);
    return await this.repository.update(id, dto);
  }
}
