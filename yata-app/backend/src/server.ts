// const express = require('express');

// const todosRoutes = require('./features/todos/routes');

// const APP_PORT = process.env.APP_PORT ?? 8080;

// const app = express();
// app.use(express.json());
// app.use(todosRoutes);

// app.listen(APP_PORT, () => {
//   console.log(`Todo App started on port ${APP_PORT}`);
// });

import express, { json, Request, Response } from 'express';

const APP_PORT = process.env.APP_PORT ?? 8080;
const app = express();
app.use(json());

app.get('/', (request: Request, response: Response) => {
  const message = 'Hello TypeScript';
  response.send({ message });
});

app.listen(APP_PORT, () => {
  console.log(`Yata App started on port ${APP_PORT}`);
});
