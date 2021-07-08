import { Router } from 'express';

import { UsersController } from './controllers';

const router = Router();
const users = new UsersController();

router.post('/register', users.register.bind(users));
// ...

export default router;
