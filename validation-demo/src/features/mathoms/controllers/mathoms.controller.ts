import { Request, Response } from 'express';

import { Controller } from '@app/core/http';
import { HttpMethod } from '@app/core/routing';

export class MathomsController extends Controller {

  prefix = '/mathoms';

  routes = [
    { method: HttpMethod.Post, path: '/', handler: this.create },
    { method: HttpMethod.Get, path: '/', handler: this.getAll },
    { method: HttpMethod.Get, path: '/:id', handler: this.getOne },
    { method: HttpMethod.Put, path: '/:id', handler: this.update },
    { method: HttpMethod.Delete, path: '/:id', handler: this.delete },
  ];

  private data: { id: number, [key: string]: any }[] = [];

  create(request: Request, response: Response) {
    const id = this.createNewMathom(request.body);
    const message = `Created mathom #${id}`;
    const content = null;
    response.send({ message, content });
  }

  getAll(request: Request, response: Response) {
    const message = 'Read all mathoms';
    const content = this.data;
    response.send({ message, content });
  }

  getOne(request: Request, response: Response) {
    const message = 'Read a mathom';
    const id = Number(request.params.id);
    const mathom = this.data.find(mathom => mathom.id === id);
    const content = !!mathom ? mathom : null;
    response.send({ message, content });
  }

  update(request: Request, response: Response) {
    const message = 'Update a mathom';
    const content = null;
    response.send({ message, content });
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
