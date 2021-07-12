import { Request, Response } from 'express';

import { ValidatorDecoratorOptions, RequestInput } from '../types';
import { ClassValidator } from '../services/class-validator';
import { NO_ERRORS } from '../helpers';

export const createRequestInputValidator = (requestInput: RequestInput) => {
  return (
    schema: ValidatorDecoratorOptions['schema'] = {},
    throwsError: ValidatorDecoratorOptions['throwsError'] = true,
  ) => {
    return (
      target: any,
      methodName: string | symbol,
      descriptor: PropertyDescriptor,
    ) => {
      return {
        ...descriptor,
        value: (request: Request, response: Response) => {

          const classValidator = new ClassValidator();
          classValidator.input = request[requestInput];
          classValidator.schema = schema;
          const errors = classValidator.validate();

          if (errors !== NO_ERRORS) {

            if (throwsError) {
              return response.status(400).send(errors);
            }

            // TODO: Add "validated" key to request...
            console.log('Validation errors', errors);
          }

          descriptor.value(request, response);
        }
      };
    };
  };
};
