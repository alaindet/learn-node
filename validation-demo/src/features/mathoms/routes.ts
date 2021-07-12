import { Router } from 'express';
import { MathomsController } from './controllers';

const prefix = '/mathoms';

const router = new Router();

export default { prefix, router };
