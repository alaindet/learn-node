import { json, RequestHandler } from 'express';
import { injectable } from 'tsyringe';

import { AppMiddleware } from '../types/classes/middleware';

@injectable()
export class ParseJsonMiddleware extends AppMiddleware {
  register(): RequestHandler {
    return json();
  }
}
