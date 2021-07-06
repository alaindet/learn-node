const todosRepository = require('../repositories/todos.repository');

const createTodo = async (req, res) => {

  const dto = {
    title: req.body.title,
    is_done: req.body.is_done ? 1 : 0,
  };

  const existingTodo = await todosRepository.getTodoByTitle(dto.title);

  if (existingTodo) {
    const message = `Todo with title "${dto.title} already exists"`;
    return res.status(400).send({ message });
  }

  const todo = await todosRepository.createTodo(dto);

  res.status(201).send(todo);
};

const readTodos = async (req, res) => {
  const todos = await todosRepository.getTodos();
  res.send(todos);
};

const readTodo = async (req, res) => {

  const id = req.params.id;

  try {
    const todo = await todosRepository.getTodo(id);
    res.send(todo);
  } catch (err) {
    const message = `Todo with id #${id} was not found`;
    res.status(404).send({ message });
  }
};

const replaceTodo = async (req, res) => {

  const id = req.params.id;

  const dto = {
    title: req.body.title,
    is_done: req.body.is_done ? 1 : 0,
  };

  try {
    const todo = await todosRepository.updateTodo(id, dto);
    res.send(todo);
  } catch (err) {
    const message = `Todo with id #${id} was not found`;
    res.status(404).send({ message });
  }
};

const deleteTodo = async (req, res) => {

  const id = req.params.id;

  try {
    const todo = await todosRepository.deleteTodo(id);
    res.send(todo);
  } catch (err) {
    const message = `Todo with id #${id} was not found`;
    res.status(404).send({ message });
  }
};

module.exports = {
  createTodo,
  readTodos,
  readTodo,
  replaceTodo,
  deleteTodo,
};
