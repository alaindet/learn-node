import { Request, Response } from 'express';

import { AppHttpMethod } from '../enums/http-method';

export interface AppRoute {
  path: string;
  method: AppHttpMethod;
  handler: (request: Request, response: Response) => any;
};
