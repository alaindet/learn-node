import { HomeController } from './features/home/controllers/home.controller';
import { NotFoundController } from './core/controllers/not-found.controller';
import { TodosController } from './features/todos/controllers/todos.controller';
// ...

export default [
  HomeController,
  TodosController,
  // // Add controllers here...
  NotFoundController, // Must be the last one
];
