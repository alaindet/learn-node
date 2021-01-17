import { container } from 'tsyringe';

import { options as corsOptions } from './core/config/cors';
import { CorsMiddleware } from './core/middlewares/cors.middleware';
import { ParseJsonMiddleware } from './core/middlewares/parse-json.middleware';
import { FooMiddleware } from './features/todos/middlewares/todos.middleware';
// ...

export default [
  container.resolve(CorsMiddleware).register(corsOptions),
  container.resolve(ParseJsonMiddleware).register(),
  container.resolve(FooMiddleware).register('Some dummy config...'),
  // Add middlewares here...
];
