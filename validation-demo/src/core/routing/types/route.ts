import { RequestHandler } from 'express';

import { HttpMethod } from './http-method';

export interface Route {
  method: HttpMethod;
  path: string;
  handler?: RequestHandler;
  middleware?: RequestHandler[];
  children?: Route[];
}
