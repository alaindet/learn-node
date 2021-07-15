import { Request, Response } from 'express';

import { Controller } from '@app/core/http';
import { HttpMethod } from '@app/core/routing';
import { NotFoundError } from '@app/core/errors';
import { FilesystemStorageService } from '@app/core/filesystem';
import { MathomsService } from '../services';
import { MathomsRepository } from '../repositories';
import { CreateMathomDto, UpdateMathomDto } from '../dtos';

export class MathomsController extends Controller {

  prefix = '/mathoms';

  routes = [
    {
      method: HttpMethod.Post,
      path: '/',
      handler: this.create
    },
    {
      method: HttpMethod.Get,
      path: '/',
      handler: this.getAll
    },
    {
      method: HttpMethod.Get,
      path: '/:id',
      handler: this.getOne
    },
    {
      method: HttpMethod.Put,
      path: '/:id',
      handler: this.update
    },
    {
      method: HttpMethod.Delete,
      path: '/:id',
      handler: this.delete
    },
  ];

  private service: MathomsService;

  // TODO: Use DI!
  constructor() {
    super();
    const storage = new FilesystemStorageService();
    const repository = new MathomsRepository(storage);
    this.service = new MathomsService(repository);
  }

  async create(request: Request, response: Response) {
    const dto = new CreateMathomDto();
    dto.title = request.body.title;
    dto.description = request.body?.description ?? null;
    const mathom = await this.service.create(dto);
    const message = `Created mathom #${mathom.id}`;
    const content = mathom;
    response.send({ message, content });
  }

  async getAll(request: Request, response: Response) {
    const mathoms = await this.service.getAll();
    const message = 'Read all mathoms';
    const content = mathoms;
    response.send({ message, content });
  }

  async getOne(request: Request, response: Response) {

    const id = request.params.id;

    try {
      const mathom = await this.service.getOne(id);
      const message = 'Read a mathom';
      const content = mathom;
      response.send({ message, content });
    }

    // TODO: Refactor
    catch (err) {
      if (err instanceof NotFoundError) {
        const message = `Could not find mathom with id "${id}"`;
        return response.status(404).send({ message });
      }
    }
  }

  async update(request: Request, response: Response) {

    const id = request.params.id;

    try {
      const dto = new UpdateMathomDto();

      // TODO: Put these assignments in a loop?
      if (request.body?.title) {
        dto.title = request.body.title;
      }

      if (request.body?.description) {
        dto.description = request.body.description;
      }

      return await this.service.update(id, dto);
    }

    catch (err) {
      if (err instanceof NotFoundError) {
        const message = `Could not find mathom with id "${id}"`;
        return response.status(404).send({ message });
      }
    }
  }

  delete(request: Request, response: Response) {
    const message = 'Delete a mathom';
    const content = null;
    response.send({ message, content });
  }

  private createNewMathom(dto: { [key: string]: any }): number {
    const id = Date.now();
    const mathom = { ...dto, id };
    this.data.push(mathom);
    return id;
  }
}
