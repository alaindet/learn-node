import { container } from 'tsyringe';

import { HomeController } from './features/home/controllers/home.controller';
import { NotFoundController } from './core/controllers/not-found.controller';
import { TodosController } from './features/todos/controllers/todos.controller';
// ...

export default [
  container.resolve(HomeController),
  container.resolve(TodosController),
  // Add controllers here...
  container.resolve(NotFoundController), // Must be the last one
];
