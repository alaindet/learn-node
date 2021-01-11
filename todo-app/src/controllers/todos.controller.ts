import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  return res.status(201).json({
    message: 'Created',
  });
});

router.get('/', (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'Read all',
  });
});

router.get('/:id', (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'Read single',
  });
});

router.patch('/:id', (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'Update',
  });
});

router.delete('/:id', (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'Delete',
  });
});

export default router;
