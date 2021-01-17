import express, { Application, RequestHandler, Router, Request, Response } from 'express';

import { AppController } from './types/classes/controller';

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

  setMiddlewares(middlewares: RequestHandler[]): this {
    for (const middleware of middlewares) {
      this.app.use(middleware);
    }
    return this;
  }

  setControllers(controllers: AppController[]): this {
    for (const controller of controllers) {
      const router = this.configureRouter(controller);
      (controller.path)
        ? this.app.use(controller.path, router)
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
