import { Request, Response } from 'express';
import { injectable } from 'tsyringe';

import { AppController } from '../../../core/types/classes/controller';
import { AppHttpMethod } from '../../../core/types/enums/http-method';

@injectable()
export class HomeController extends AppController {

  path = '/';
  routes = [
    { method: AppHttpMethod.Get, path: '/', handler: this.welcome },
  ];

  welcome(request: Request, response: Response) {
    return response.send({
      message: 'Welcome to Todo app',
    });
  }
}
