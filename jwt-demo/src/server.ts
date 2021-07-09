import express, { Request, Response, NextFunction } from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';

import { errorHandler } from './core/middleware/error-handler';
// import usersRoutes from './features/users/routes';

// const CORS_OPTIONS = {
//   credentials: true,
//   origin: (_, cb) => cb(null, true),
// };

// Setup and middlewares
const app = express();
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors(CORS_OPTIONS));

// // Routes
// app.use('/users', usersRoutes);

// // Error handling
app.use(errorHandler);

function MyMethodDecorator(config: any) {
  return function (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    console.log('MyMethodDecorator at startup', config, target, key, descriptor);
    return {
      ...descriptor,
      value: (req: Request, res: Response) => {

        console.log('MyMethodDecorator at runtime', req.query.foo);

        if (!Number(req.query.foo)) {
          res.status(400).send('Missing foo');
          return;
        }

        descriptor.value(req, res);
      },
    };
  }
}

class MyController {
  @MyMethodDecorator({ foo: 11, bar: 22 })
  myRequestHandler(req: Request, res: Response) {
    res.send('Hello World');
  }
}

const myController = new MyController();

app.get('/', myController.myRequestHandler.bind(myController));

// Bootstrap
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
