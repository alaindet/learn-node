import { Request, Response } from 'express';
import { injectable } from 'tsyringe';

import { AppController } from '../../../core/types/classes/controller';
import { AppHttpMethod } from '../../../core/types/enums/http-method';

@injectable()
export class TodosController extends AppController {

  path = '/todos';
  routes = [
    { method: AppHttpMethod.Get, path: '/', handler: this.readAll },
    { method: AppHttpMethod.Get, path: '/:id', handler: this.read },
    { method: AppHttpMethod.Post, path: '/', handler: this.create },
    { method: AppHttpMethod.Patch, path: '/:id', handler: this.update },
    { method: AppHttpMethod.Delete, path: '/:id', handler: this.delete },
  ];

  readAll(request: Request, response: Response) {
    return response.send({
      message: 'get all',
    });
  }
  
  read(request: Request, response: Response) {
    const id = request.params.id;
    return response.send({
      message: `get ${id}`,
    });
  }

  create(request: Request, response: Response) {
    return response.send({
      message: 'create',
    });
  }

  update(request: Request, response: Response) {
    const id = request.params.id;
    return response.send({
      message: `update ${id}`,
    });
  }

  delete(request: Request, response: Response) {
    const id = request.params.id;
    return response.send({
      message: `delete ${id}`,
    });
  }
}
