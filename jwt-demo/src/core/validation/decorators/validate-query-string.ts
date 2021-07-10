import { Request, Response } from 'express';

import { NoErrors, ClassValidationErrors, ValidatorDecoratorOptions } from '../types';
import { ClassValidator } from '../services/class-validator';
import { NO_ERRORS } from '../helpers';

export interface RequestWithValidation extends Request {
  validation: ClassValidationErrors | NoErrors;
}

export function ValidateQueryString(
  schema: ValidatorDecoratorOptions['schema'] = {},
  throwsError: ValidatorDecoratorOptions['throwsError'] = true,
) {
  return function (
    target: any,
    methodName: string | symbol,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    return {
      ...descriptor,
      value: (request: Request, response: Response) => {

        const classValidator = new ClassValidator();
        classValidator.input = request.query;
        classValidator.schema = schema;
        const errors = classValidator.validate();

        if (errors !== NO_ERRORS) {

          if (throwsError) {
            response.status(400).send(errors);
            return;
          }
          
          else {
            // TODO
            // https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
            request['validation'] = errors;
          }

        }

        descriptor.value(request, response);
      }
    };
  }
}
