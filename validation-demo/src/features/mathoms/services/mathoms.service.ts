import { FilesystemStorageService } from '@app/core/filesystem';
import { CreateMathomDto } from '../dtos';
import { Mathom } from '../entities';
import { MathomsRepository } from '../repositories';

export class MathomsService {

  repository: MathomsRepository;

  constructor() {
    const path = 'features/mathoms/storage/mathoms.json';
    this.storage = new FilesystemStorageService();
    this.repository = new MathomsRepository();
  }

  async create(dto: CreateMathomDto): Promise<Mathom> {

  }
}
