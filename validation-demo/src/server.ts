import express, { json } from 'express';

import { errorHandler } from '@app/core/middleware';
import { initializeRouter } from '@app/core/routing';

const app = express();
app.use(json());
app.use(initializeRouter());
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`)
});
