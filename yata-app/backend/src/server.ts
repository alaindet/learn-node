import express, { json } from 'express';

import { routes } from './features/todos';

const APP_PORT = process.env.APP_PORT ?? 8080;
const app = express();
app.use(json());

app.use(routes);

app.listen(APP_PORT, () => {
  console.log(`Yata App started on port ${APP_PORT}`);
});
