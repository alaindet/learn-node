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
  const id = req.params.id;
  return res.status(200).json({
    message: `Read single with ID ${id}`,
  });
});

router.patch('/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  return res.status(200).json({
    message: `Update with ID ${id}`,
  });
});

router.delete('/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  return res.status(200).json({
    message: `Delete with ID ${id}`,
  });
});

export default router;
