import { Router } from 'express';

import { TodosController } from './controllers/todos.controller';

const router = Router();
const todos = new TodosController();

router.post('/', todos.createTodo.bind(todos));
router.get('/', todos.readTodos.bind(todos));
router.get('/:id', todos.readTodo.bind(todos));
router.patch('/:id', todos.updateTodo.bind(todos));
router.delete('/:id', todos.deleteTodo.bind(todos));

export default router;
