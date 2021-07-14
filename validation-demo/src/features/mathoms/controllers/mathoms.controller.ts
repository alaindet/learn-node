import { Request, Response } from 'express';

import { Route } from '@core/routing';

export class MathomsController extends Controller {

  private data: { id: number, [key: string]: any }[] = [];

  @Route.Get('/mathoms')
  getAll(request: Request, response: Response) {
    const message = 'Read all mathoms';
    const content = this.data;
    response.send({ message, content });
  }

  @Route.Post('/mathoms')
  create(request: Request, response: Response) {
    const id = this.createNewMathom(request.body);
    const message = `Created mathom #${id}`;
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
