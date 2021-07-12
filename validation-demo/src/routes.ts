import { Router } from 'express';

// Import child routes here...
import MathomsRoutes from '@features/mathoms';

const router = new Router();

router.use(MathomsRoutes);
// Register routes here...

export default router;
