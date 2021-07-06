const { getConnection } = require('../../../core/database');
const NotFoundException = require('../exceptions/not-found.exception');

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


module.exports = {
  getTodo,
  getTodoByTitle,
  createTodo,
};
