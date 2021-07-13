import { Request, Response } from 'express';

import { Route } from '@core/routing';

export class MathomsController {

  @Route.Get('/mathoms')
  getAll(request: Request, response: Response) {
    response.send('Read all mathoms');
  }

  @Route.Post('/mathoms')
  create(request: Request, response: Response) {
    response.send('Create mathom');
  }
}
