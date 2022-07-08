import { Request, Response } from 'express';

export class UsersController {

  constructor() {
    // ...
  }

  async create(request: Request, response: Response) {
    response.send({
      message: 'Creating a new user...',
    });
  }
}
