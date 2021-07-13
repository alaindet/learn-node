import { Request, Response } from 'express';

import { Route, HttpMethod } from './core/routing';

export class FooController {

  @Route(HttpMethod.Get, '/foo')
  readAll(req: Request, res: Response) {
    res.send('FooController.readAll...');
  }

  @Route(HttpMethod.Post, '/foo')
  create(req: Request, res: Response) {
    res.send('FooController.create...');
  }
}
