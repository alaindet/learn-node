import * as dotenv from 'dotenv';
import { join } from 'path';
import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import corsOptions from './config/cors';
import databaseOptions from './config/database';
import homeController from './controllers/home.controller';
import todosController from './controllers/todos.controller';
import errorsController from './controllers/errors.controller';

// Initialization
dotenv.config({ path: join(__dirname, '..', '.env') });
const app = express();

// Middlewares
app.use(cors(corsOptions));
app.use(helmet());
app.disable('x-powered-by');
app.use(express.json());
// app.use(express.urlencoded());

// Routes
app.use('/', homeController);
app.use('/todos', todosController);
app.use(errorsController);

// Boot
app.listen(process.env['APP_PORT'], () => {
  console.log(
    `${process.env['APP_NAME']} app started on port ${process.env['APP_PORT']}`
  );
});
