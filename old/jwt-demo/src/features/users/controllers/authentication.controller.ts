import { Request, Response } from 'express';

export class AuthenticationController {

  constructor() {
    // ...
  }

  async login(request: Request, response: Response) {
    response.send('Login');
  }

  async refreshToken(request: Request, response: Response) {
    response.send('Refresh token');
  }

  async revokeToken(request: Request, response: Response) {
    response.send('Revoke token');
  }

  async verifyEmail(request: Request, response: Response) {
    response.send('Verify email');
  }
}
