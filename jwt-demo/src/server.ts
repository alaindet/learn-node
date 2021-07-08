import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { errorHandler } from './core/middleware/error-handler';
import usersRoutes from './features/users/routes';

const CORS_OPTIONS = {
  credentials: true,
  origin: (_, cb) => cb(null, true),
};

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(CORS_OPTIONS));

app.use('/users', usersRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
