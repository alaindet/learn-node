import express, { Request, Response } from 'express';

const router = express.Router();

router.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    message: 'Not found',
  });
});

export default router;
