import { Router } from 'express';

import { controllers } from '@app/routes';

export const initializeRouter = (): Router => {

  const router = Router();

  for (const controllerClass of controllers) {

    // TODO: Call via dependency injection?
    const controller = new controllerClass();
    const routes = controller.exportRoutes();

    for (const route of routes) {
      router[route.method](route.path, route.handler);
    }
  }

  return router;

};
