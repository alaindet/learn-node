import * as dotenv from 'dotenv';
import { join } from 'path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'reflect-metadata'; // TypeORM-specific
import { createConnection } from 'typeorm';

import corsOptions from './config/cors';
import homeController from './controllers/home.controller';
import todosController from './controllers/todos.controller';
import errorsController from './controllers/errors.controller';
import { Todo } from './entities/todo.entity';

// Initialization
dotenv.config({ path: join(__dirname, '..', '.env') });
const app = express();
(async () => {
  try {
    const connection = await createConnection();

    // TEST BEGIN
    let todo = new Todo();
    todo.isDone = false;
    todo.text = 'This is a thing to do';
    await connection.manager.save(todo);
    console.log('Todo item has been saved');
    // TEST END

  } catch (error) {
    console.error('Could not establish a database connection');
    process.exit(1);
  }
})();

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

export default app;
