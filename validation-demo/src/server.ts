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

// THIS works
/*
interface Route {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete'; // Add the rest...
}

class BaseController {
  prefix: string;
  routes: Route[] = [];
}

function Controller(prefix = '/') {
  console.log('Controller startup');
  return function <T extends { new(...args: any[]): {} }>(constructor: T) {
    console.log('Controller runtime');
    constructor.prototype.prefix = prefix;
  }
}

@Controller('/foo')
class FooController extends BaseController {

  // @Route('POST', '/create')
  create(): void {
    console.log('FooController.create');
  }

  // @Route('GET', '/read')
  read(): void {
    console.log('FooController.read');
  }
}

const foo = new FooController();
console.log(foo.prefix);
*/
