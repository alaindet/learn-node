import { AppMiddlewareWithOptions } from './core/types/classes/middleware-with-options';
import { SecurityMiddleware } from './core/middlewares/security.middleware';
import { CorsMiddleware } from './core/middlewares/cors.middleware';
import { options as corsOptions } from './core/config/cors';
import { ParseJsonMiddleware } from './core/middlewares/parse-json.middleware';
// import { FooMiddleware } from './features/todos/middlewares/todos.middleware';
// ...

export default [
  SecurityMiddleware,
  new AppMiddlewareWithOptions(CorsMiddleware, corsOptions),
  ParseJsonMiddleware,
  // new AppMiddlewareWithOptions(FooMiddleware, 'Some dummy config'),
  // Add middlewares here...
];
