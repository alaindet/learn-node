import express, { json } from 'express';

import todosRoutes from './features/todos/routes';

const APP_PORT = process.env.APP_PORT ?? 8080;
const app = express();
app.use(json());

app.use('/todos', todosRoutes);

app.listen(APP_PORT, () => {
  console.log(`Yata App started on port ${APP_PORT}`);
});
