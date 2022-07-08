import { Request, Response } from 'express';

export class PasswordResetController {

  constructor() {
    // ...
  }

  async forgotPassword(request: Request, response: Response) {
    response.send('Forgot password');
  }

  async validateResetToken(request: Request, response: Response) {
    response.send('Validate reset token');
  }

  async resetPassword(request: Request, response: Response) {
    response.send('Reset password');
  }
}
