import { ValidationSchema } from './schema';

export interface ValidatorDecoratorOptions {

  schema: ValidationSchema;

  /**
   * If TRUE, throws a new ValidatorError automatically sending 400 Bad Request
   * If FALSE, sets a new "validation" key on the request
   */
  throwsError: boolean;
}
