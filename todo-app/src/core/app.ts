import { container } from 'tsyringe';
import express, { Application, RequestHandler, Router, Request, Response } from 'express';

import { AppController } from './types/classes/controller';
import { AppMiddleware } from './types/classes/middleware';
import { AppMiddlewareWithOptions } from './types/classes/middleware-with-options';
import { Constructable } from './types/interfaces/constructable';

export class App {

  private app: Application;
  private port: number = 80;

  constructor() {
    this.app = express();
  }

  setPort(port: number): this {
    this.port = port;
    return this;
  }

  setMiddlewares(
    middlewares: (Constructable<AppMiddleware> | AppMiddlewareWithOptions)[],
  ): this {
    for (const middleware of middlewares) {
      let requestHandler: RequestHandler;
      if (middleware instanceof AppMiddlewareWithOptions) {
        const instance = container.resolve(middleware.constructable);
        requestHandler = instance.register(middleware.options);
      } else {
        const instance = container.resolve(middleware);
        requestHandler = instance.register();
      }
      this.app.use(requestHandler);
    }
    return this;
  }

  setControllers(controllers: Constructable<AppController>[]): this {
    for (const controller of controllers) {
      const controllerInstance = container.resolve(controller);
      const router = this.configureRouter(controllerInstance);
      (controllerInstance.path)
        ? this.app.use(controllerInstance.path, router)
        : this.app.use(router);
    }
    return this;
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Application started on port ${this.port}`);
    });
  }

  private configureRouter(controller: AppController): Router {
    const router = Router();
    for (const route of controller.routes) {
      const handler = (req: Request, res: Response) => route.handler(req, res);
      router[route.method](route.path, handler);
    }
    return router; 
  }
}
