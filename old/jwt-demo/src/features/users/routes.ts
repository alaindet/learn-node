import { Router } from 'express';

import { UsersController } from './controllers';

const router = Router();
const users = new UsersController();

const temp = (req, res) => res.send('temp');

// Authentication
router.post('/login');
router.post('/login', temp);
router.post('/refresh-token', temp);
router.post('/revoke-token', temp);
router.post('/register', temp);
router.post('/verify-email', temp);

// Reset
router.post('/forgot-password', temp);
router.post('/validate-reset-token', temp);
router.post('/reset-password', temp);

// Crud
router.get('/', temp);
router.get('/:id', temp);
router.put('/:id', temp);
router.delete('/:id', temp);

export default router;
