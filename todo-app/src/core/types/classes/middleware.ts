import { RequestHandler } from 'express';

export abstract class AppMiddleware {
  abstract register(...args: any[]): RequestHandler;
}
