import { RequestHandler } from 'express';
import { injectable } from 'tsyringe';
import cors, { CorsOptions } from 'cors';

import { AppMiddleware } from '../types/classes/middleware';

@injectable()
export class CorsMiddleware extends AppMiddleware {
  register(options: CorsOptions): RequestHandler {
    return cors(options);
  }
}
