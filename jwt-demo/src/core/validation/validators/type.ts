import { Validator, ValidationErrors, NoErrors } from '../types';
import { error, NO_ERRORS } from '../helpers';

const name = 'type';

const err = (message: string) => error(name, message);

export type AvailableType = (
  | 'undefined'
  | 'null'
  | 'boolean'
  | 'number'
  | 'string'
  | 'function'
  | 'object'
);

/**
 * Based on
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
 */
export const typeValidator: Validator<string | number> = (
  input: any,
  typeArg: AvailableType | AvailableType[],
): ValidationErrors | NoErrors => {
  
  const typeArgs: AvailableType[] = Array.isArray(typeArg) ? typeArg : [typeArg];
  const inputType = typeof input;
  const isValid = typeArgs.filter(t => inputType === t).length > 0;

  if (!isValid) {
    const typesList = typeArgs.join(', ');
    return err(`Input must be of type: ${typesList}`);
  }

  return NO_ERRORS;
}
