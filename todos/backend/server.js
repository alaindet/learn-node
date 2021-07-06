const express = require('express');
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  port: 3306,
  user: 'todoapp',
  password: 'todoapp',
  database: 'todoapp',
  connectionLimit: 5,
  connectTimeout: 2000,
});

const getConnection = async () => {
  try {
    const connection = await pool.getConnection();
    return connection;
  } catch (err) {
    if (connection) {
      connection.end();
    }
    throw err;
  }
};

const app = express();

app.use(express.json());

// Check for existing?
app.post('/todos', async (req, res) => {
  const body = req.body;
  const dto = {
    title: body.title,
    is_done: body.is_done ? 1 : 0,
  };
  const db = await getConnection();

  let sql = `SELECT * FROM todos WHERE title = :title`;
  const todos = await db.query({ namedPlaceholders: true, sql }, { title: dto.title });

  if (todos.length) {
    res.status(400).send({
      error: true,
      message: `Todo with title "${dto.title} already exists"`,
    });
    return;
  }

  sql = `INSERT INTO todos (title, is_done) VALUES (:title, :is_done)`;
  const result = await db.query({ namedPlaceholders: true, sql }, dto);
  const todo = { ...dto, id: result.insertId };
  res.status(201).send(todo);
});

app.get('/todos', async (req, res) => {
  const db = await getConnection();
  const todos = await db.query(`SELECT * FROM todos`);
  res.send(todos);
});

app.get('/todos/:id', async (req, res) => {
  const id = req.params.id;
  const db = await getConnection();
  const sql = `SELECT * FROM todos WHERE id = :id`;
  const todos = await db.query({ namedPlaceholders: true, sql }, { id });

  if (!todos.length) {
    res.status(404).send({
      error: true,
      message: `Todo with id #${id} was not found`,
    });
    return;
  }

  const todo = todos[0];
  res.send(todo);
});

app.put('/todos/:id', async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const dto = {
    title: body.title,
    is_done: body.is_done ? 1 : 0,
  };
  const db = await getConnection();
  let sql = `SELECT * FROM todos WHERE id = :id`;
  const todos = await db.query({ namedPlaceholders: true, sql }, { id });

  if (!todos.length) {
    res.status(404).send({
      error: true,
      message: `Todo with id #${id} was not found`,
    });
    return;
  }

  sql = `UPDATE todos SET title = :title, is_done = :is_done`;
  await db.query({ namedPlaceholders: true, sql }, dto);
  const todo = { id, ...dto };
  res.send(todo);
});

app.delete('/todos/:id', async (req, res) => {
  const id = req.params.id;
  const db = await getConnection();
  let sql = `SELECT * FROM todos WHERE id = :id`;
  const todos = await db.query({ namedPlaceholders: true, sql }, { id });

  if (!todos.length) {
    res.status(404).send({
      error: true,
      message: `Todo with id #${id} was not found`,
    });
    return;
  }

  const todo = todos[0];
  sql = `DELETE FROM todos WHERE id = :id`;
  await db.query({ namedPlaceholders: true, sql }, { id });
  res.send(todo);
});

const APP_PORT = process.env.APP_PORT ?? 8080;

app.listen(APP_PORT, () => {
  console.log(`Todo App started on port ${APP_PORT}`);
});
