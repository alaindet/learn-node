import { RequestHandler, NextFunction, Request, Response } from 'express';

import { AppMiddleware } from '../../../core/types/classes/middleware';

export class FooMiddleware extends AppMiddleware {

  private message: string;

  register(message: string): RequestHandler {
    this.message = message;
    return this.run.bind(this);
  }

  run(request: Request, response: Response, next: NextFunction) {
    console.log('FooMiddleware: ', this.message);
    next();
  }
}
