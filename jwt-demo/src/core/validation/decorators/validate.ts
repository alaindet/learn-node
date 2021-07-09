// Based on
// https://github.com/alaindet/fowdb/blob/main/src/app/Services/Validation/ValidationRulesTrait.php

import { Request, Response } from 'express';
import { ValidationSchema } from '../types';

export function Validate(schema: ValidationSchema) {
  return function (
    target: any,
    methodName: string | symbol,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    return {
      ...descriptor,
      value: (request: Request, response: Response) => {

        let isValid = true;

        // Perform validation

        if (!isValid) {
          // Throw validation exception
        }

        descriptor.value(request, response);

      }
    };
  }
}
