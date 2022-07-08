import { Request, Response, Router } from 'express';

import { HttpMethod } from '@core/routing';
import { Validate, ClassValidator, ValidationRule, ValidationInputType } from '@core/validation';

export class MathomsController {

  prefix = '/mathoms';

  routes = [
    {
      path: '/first',
      method: HttpMethod.Get,
      handler: this.first,
    },
    {
      path: '/second',
      method: HttpMethod.Get,
      handler: this.second,
    },
  ];

  // Move to base class or decorator?
  getRoutes(): Router {
    const router = new Router();

    for (const route of this.routes) {
      router[route.method](route.path, route.handler.bind(this));
    }

    return router;
  }

  first(request: Request, response: Response) {
    response.send('mathoms first');
  }

  second(request: Request, response: Response) {
    response.send('mathoms second');
  }

  // home(req: Request, res: Response) {

  //   // TODO: Validation via decorator
  //   // TODO: Validation via middleware
  //   // Manual validation
  //   const validator = new ClassValidator();

  //   validator.input = {
  //     foo: 6,
  //     // baz: 'hey',
  //   };

  //   validator.schema = {
  //     foo: {
  //       [ValidationRule.Required]: true,
  //       [ValidationRule.Equals]: 42,
  //     },
  //     baz: {
  //       [ValidationRule.Required]: false,
  //       [ValidationRule.Type]: ValidationInputType.Boolean,
  //     },
  //   };

  //   validator.validate();

  //   if (!validator.isValid) {
  //     return res.status(400).send({
  //       message: 'Validation failed',
  //       errors: validator.errors,
  //     });
  //   }

  //   res.send('Validation passed');
  // }

  // @Validate.QueryString({
  //   foo: {
  //     [ValidationRule.Required]: true,
  //     [ValidationRule.Equals]: '42',
  //   },
  //   baz: {
  //     [ValidationRule.Required]: false,
  //     [ValidationRule.In]: ['11', '22', '33'],
  //   },
  // })
  // deco(req: Request, res: Response) {
  //   res.send('Validation passed');
  // }
}
