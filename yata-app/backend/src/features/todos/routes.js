const express = require('express');

const todosController = require('./controllers/todos.controller');

const router = express.Router();
const prefix = '/todos';

router.post(prefix, todosController.createTodo);
router.get(prefix, todosController.readTodos);
router.get(`${prefix}/:id`, todosController.readTodo);
router.put(`${prefix}/:id`, todosController.replaceTodo);
router.delete(`${prefix}/:id`, todosController.deleteTodo);

module.exports = router;
