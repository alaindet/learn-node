import { Constructable } from '../interfaces/constructable';
import { AppMiddleware } from './middleware';

export class AppMiddlewareWithOptions {
  constructor(
    public constructable: Constructable<AppMiddleware>,
    public options: any,
  ) {}
}
