import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { join } from 'path';

import { App } from './core/app';
import controllers from './controllers';
import middlewares from './middlewares';

dotenv.config({ path: join(__dirname, '..', '.env') });

const app = new App();
app.setPort(Number(process.env['APP_PORT']));
app.setMiddlewares(middlewares);
app.setControllers(controllers);
app.start();
