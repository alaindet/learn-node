import { Request, Response } from 'express';

export class UsersController {

  constructor() {
    // ...
  }

  async register(request: Request, response: Response) {
    response.send({
      message: 'Registering...',
    });
  }
}
