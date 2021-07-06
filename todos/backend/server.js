const express = require('express');

const app = express();

app.use(express.json());

app.post('/todos', (req, res) => {
  const body = req.body;
  console.log('request body', body);
  res.send('Creating a new todo');
});

app.get('/todos', (req, res) => {
  res.send('List of all todos');
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  res.send(`Details of todo # ${id}`);
});

app.put('/todos/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;
  console.log('request body', body);
  res.send(`Updating todo #${id}`);
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  res.send(`Deleting todo #${id}`);
});

const APP_PORT = process.env.APP_PORT ?? 8080;

app.listen(APP_PORT, () => {
  console.log(`Todo App started on port ${APP_PORT}`);
});
