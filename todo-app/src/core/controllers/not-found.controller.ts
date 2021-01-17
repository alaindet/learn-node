import { Request, Response } from 'express';
import { injectable } from 'tsyringe';

import { AppController } from '../types/classes/controller';
import { AppHttpMethod } from '../types/enums/http-method';

@injectable()
export class NotFoundController extends AppController {

  path = null; // Root-level
  routes = [
    { method: AppHttpMethod.Get, path: '*', handler: this.notFound },
  ];

  notFound(request: Request, response: Response) {
    return response.status(404).json({
      message: 'Not found',
    });
  }
}
