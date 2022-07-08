import express from 'express';

import { errorHandler } from './core/middleware';
// import { HttpMethod, RoutesStore } from './core/routing';
// import {
//   Validate,
//   ValidationRule,
//   ClassValidator,
//   ValidationInputType } from './core/validation';

const app = express();

// Error handling
app.use(errorHandler);

// const controllers = [
//   MyController,
// ];

// const routesStore = new RoutesStore();
// const router = Router();

// for (const controller of controllers) {
//   new controller(routesStore);
// }

// for (const route of routesStore.routes) {
//   route.middleware
//     ? router[route.method](route.path, ...route.middleware, route.handler)
//     : router[route.method](route.path, route.handler);
// }

// app.use(router);

// Bootstrap
const PORT = 3000;
app.listen(PORT, () => console.log(`App started on port ${PORT}`));
