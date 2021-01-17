import { RequestHandler } from 'express';
import { injectable } from 'tsyringe';
import helmet from 'helmet';

import { AppMiddleware } from '../types/classes/middleware';

@injectable()
export class SecurityMiddleware extends AppMiddleware {
  register(): RequestHandler {
    return helmet();
  }
}
