import express from 'express';

import { errorHandler } from '@core/middleware';
import router from '@core/routing/init';

const app = express();
app.use(errorHandler);
app.use(router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`)
});
