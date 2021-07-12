import { RequestHandler } from 'express';

import { HttpMethod } from './http-method';

export interface Route {
  path: string;
  method: HttpMethod;
  handler: RequestHandler;
  middleware?: RequestHandler[];
}
