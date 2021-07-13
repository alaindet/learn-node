import express from 'express';

import { FooController } from './foo.controller';

import { errorHandler } from '@core/middleware';
import { HttpMethod } from '@core/routing';
import RouteStore from '@core/routing/services/route-store';

// import { HttpMethod, RoutesStore } from './core/routing';
// import {
//   Validate,
//   ValidationRule,
//   ClassValidator,
//   ValidationInputType } from './core/validation';

const app = express();

// Error handling
app.use(errorHandler);

// Register all controllers
const controllers = [
  FooController,
];

// Instantiate all controllers
for (const controllerClass of controllers) {
  const controller = new controllerClass();
}

// Register all routes
for (const route of RouteStore.getAll()) {
  const method = route.method as HttpMethod;
  app[method](route.path, route.handler);
}

// Bootstrap
const PORT = 3000;
app.listen(PORT, () => console.log(`App started on port ${PORT}`));
