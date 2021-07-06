import { Router } from 'express';

import { TodosController } from './controllers/todos.controller';

// TODO: Use decorators?
export const routes = (router => {
  
  const todos = new TodosController();

  router.post('/todos', todos.createTodo.bind(todos));
  router.get('/todos', todos.readTodos.bind(todos));
  router.get('/todos/:id', todos.readTodo.bind(todos));
  router.patch('/todos/:id', todos.updateTodo.bind(todos));
  router.delete('/todos/:id', todos.deleteTodo.bind(todos));

  return router;

})(Router());
