const { getConnection } = require('../../../core/database');
const todosRepository = require('../repositories/todos.repository');

const createTodo = async (req, res) => {

  const body = req.body;

  const dto = {
    title: body.title,
    is_done: body.is_done ? 1 : 0,
  };

  const db = await getConnection();
  let sql = `SELECT * FROM todos WHERE title = :title`;
  let values = { title: dto.title };
  let query = { namedPlaceholders: true, sql };
  let result = await db.query(query, values);

  if (result.length) {
    res.status(400).send({
      error: true,
      message: `Todo with title "${dto.title} already exists"`,
    });
    db.end();
    return;
  }

  sql = `INSERT INTO todos (title, is_done) VALUES (:title, :is_done)`;
  query = { namedPlaceholders: true, sql };
  result = await db.query(query, values);
  const todo = { ...dto, id: result.insertId };
  db.end();
  res.status(201).send(todo);
};

const readTodos = async (req, res) => {
  const db = await getConnection();
  const query = `SELECT * FROM todos`;
  const todos = await db.query(query);
  db.end();
  res.send(todos);
};

const readTodo = async (req, res) => {

  const id = req.params.id;

  try {
    const todo = todosRepository.getTodo();
    res.send(todo);
  } catch (err) {
    const message = `Todo with id #${id} was not found`;
    res.status(404).send({ message });
  }
};

const replaceTodo = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const dto = {
    title: body.title,
    is_done: body.is_done ? 1 : 0,
  };

  const db = await getConnection();
  let sql = `SELECT * FROM todos WHERE id = :id`;
  let query = { namedPlaceholders: true, sql };
  let values = { id };
  let result = await db.query(query, values);

  if (!result.length) {
    res.status(404).send({
      error: true,
      message: `Todo with id #${id} was not found`,
    });
    db.end();
    return;
  }

  sql = `UPDATE todos SET title = :title, is_done = :is_done`;
  query = { namedPlaceholders: true, sql };
  values = { id };
  await db.query(query, values);
  const todo = { id, ...dto };
  db.end();

  res.send(todo);
};

const deleteTodo = async (req, res) => {
  const id = req.params.id;

  const db = await getConnection();
  let sql = `SELECT * FROM todos WHERE id = :id`;
  let query = { namedPlaceholders: true, sql };
  let values = { id };
  let result = await db.query(query, values);

  if (!result.length) {
    res.status(404).send({
      error: true,
      message: `Todo with id #${id} was not found`,
    });
    db.end();
    return;
  }

  const todo = result[0];
  sql = `DELETE FROM todos WHERE id = :id`;
  query = { namedPlaceholders: true, sql };
  values = { id };
  await db.query(query, values);
  db.end();

  res.send(todo);
};

module.exports = {
  createTodo,
  readTodos,
  readTodo,
  replaceTodo,
  deleteTodo,
};
