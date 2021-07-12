import express, { Router, Request, Response, NextFunction, RequestHandler } from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';

import { errorHandler } from './core/middleware/error-handler';
import { Validate, ValidationRule, ClassValidator, ValidationInputType, ValidateQueryString } from './core/validation';
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

// function MyMethodDecorator(config: any) {
//   return function (
//     target: any,
//     key: string | symbol,
//     descriptor: PropertyDescriptor
//   ) {
//     console.log('MyMethodDecorator at startup', config, target, key, descriptor);
//     return {
//       ...descriptor,
//       value: (req: Request, res: Response) => {

//         console.log('MyMethodDecorator at runtime', req.query.foo);

//         if (!Number(req.query.foo)) {
//           res.status(400).send('Missing foo');
//           return;
//         }

//         descriptor.value(req, res);
//       },
//     };
//   }
// }

export enum HttpMethod {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Patch = 'patch',
  Delete = 'delete',
}

export interface Route {
  path: string;
  method: HttpMethod;
  handler: RequestHandler;
  middleware?: RequestHandler[];
}

class RoutesStore {

  routes: Route[] = [];

  add(arg: Route | Route[]) {
    const routes = Array.isArray(arg) ? arg : [arg];
    this.routes.push(...routes);
  }
}

class MyController {

  constructor(routes: RoutesStore) {
    routes.add([
      {
        path: '/',
        method: HttpMethod.Get,
        handler: this.home.bind(this),
      },
      {
        path: '/deco',
        method: HttpMethod.Get,
        handler: this.deco.bind(this),
      },
    ]);
  }

  home(req: Request, res: Response) {

    // TODO: Validation via decorator
    // TODO: Validation via middleware
    // Manual validation
    const validator = new ClassValidator();

    validator.input = {
      foo: 6,
      // baz: 'hey',
    };

    validator.schema = {
      foo: {
        [ValidationRule.Required]: true,
        [ValidationRule.Equals]: 42,
      },
      baz: {
        [ValidationRule.Required]: false,
        [ValidationRule.Type]: ValidationInputType.Boolean,
      },
    };

    validator.validate();

    if (!validator.isValid) {
      return res.status(400).send({
        message: 'Validation failed',
        errors: validator.errors,
      });
    }

    res.send('Validation passed');
  }

  @Validate.QueryString({
    foo: {
      [ValidationRule.Required]: true,
      [ValidationRule.Equals]: '42',
    },
    baz: {
      [ValidationRule.Required]: false,
      [ValidationRule.In]: ['11', '22', '33'],
    },
  })
  deco(req: Request, res: Response) {
    res.send('Validation passed');
  }
}

const routes = new RoutesStore();
new MyController(routes);
const router = Router();

for (const route of routes.routes) {
  route.middleware
    ? router[route.method](route.path, ...route.middleware, route.handler)
    : router[route.method](route.path, route.handler);
}

app.use(router);

// Bootstrap
const PORT = 3000;
app.listen(PORT, () => console.log(`App started on port ${PORT}`));
