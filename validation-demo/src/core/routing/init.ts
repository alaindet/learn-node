import { Router } from 'express';

import { controllers } from '../../routes';
import RouteStore from '@core/routing/services/route-store';
import { HttpMethod } from '@core/routing';

// This triggers any routing decorator
const _triggerAllDecorators = controllers;

const router = Router();

// Register all routes
for (const route of RouteStore.getAll()) {
  const method = route.method as HttpMethod;
  router[method](route.path, route.handler);
}

export default router;
