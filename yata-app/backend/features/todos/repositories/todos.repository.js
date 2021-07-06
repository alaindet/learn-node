const { getConnection } = require('../../../core/database');
const NotFoundException = require('../exceptions/not-found.exception');

const createTodo = async dto => {
  const db = await getConnection();
  const sql = `INSERT INTO todos (title, is_done) VALUES (:title, :is_done)`;
  const query = { namedPlaceholders: true, sql };
  const values = { ...dto };
  const result = await db.query(query, values);
  const todo = { ...dto, id: result.insertId };
  db.end();
  return todo;
};

const getTodos = async () => {
  const db = await getConnection();
  const query = `SELECT * FROM todos`;
  const todos = await db.query(query);
  db.end();
  return todos;
};

const getTodo = async id => {

  const db = await getConnection();
  const sql = `SELECT * FROM todos WHERE id = :id`;
  const values = { id };
  const query = { namedPlaceholders: true, sql };
  const result = await db.query(query, values);
  db.end();

  if (!result.length) {
    throw new NotFoundException(`Todo #${id} not found`);
  }

  return result[0];
};

const getTodoByTitle = async title => {

  const db = await getConnection();
  const sql = `SELECT * FROM todos WHERE title = :title`;
  const values = { title };
  const query = { namedPlaceholders: true, sql };
  const result = await db.query(query, values);
  db.end();

  if (!result.length) {
    return null;
  }

  return result[0];
};

const updateTodo = async (id, dto) => {
  const db = await getConnection();
  const todo = await getTodo(id);
  const sql = `UPDATE todos SET title = :title, is_done = :is_done`;
  const values = { ...dto };
  const query = { namedPlaceholders: true, sql };
  await db.query(query, values);
  db.end();
  return { ...todo, ...dto };
};

const deleteTodo = async id => {
  const db = await getConnection();
  const todo = await getTodo(id);
  const sql = `DELETE FROM todos WHERE id = :id`;
  const query = { namedPlaceholders: true, sql };
  const values = { id };
  await db.query(query, values);
  db.end();
  return todo;
};

module.exports = {
  createTodo,
  getTodos,
  getTodo,
  getTodoByTitle,
  updateTodo,
  deleteTodo,
};
