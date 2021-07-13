import { RequestHandler } from 'express';

import { HttpMethod } from './http-method';

export interface RouteDescriptor {
  method: HttpMethod;
  path: string;
  handler: RequestHandler;
}
