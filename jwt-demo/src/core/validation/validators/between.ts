import { Validator, ValidationErrors, NoErrors } from '../types';
import { error, NO_ERRORS } from '../helpers';

const name = 'between';

const err = (message: string) => error(name, message);

export const betweenValidator: Validator<string | number> = (
  input: string | number,
  from: string | number,
  to: string | number,
): ValidationErrors | NoErrors => {

  if (input === undefined || from === undefined || to === undefined) {
    return err('Missing input and/or validation arguments');
  }

  switch (typeof input) {

    case 'string':
      if (typeof from !== 'string' || typeof to !== 'string') {
        return err('From and to must be strings');
      }
      break;

    case 'number':
      if (typeof from !== 'number' || typeof to !== 'number') {
        return err('From and to must be numbers');
      }
      break;

    default:
      return err('Input must be a string or a number');
  }

  if (input < from) {
    const limit = typeof from === 'string' ? `"${from}"` : from;
    return err(`Input must be greater than ${limit}`);
  }

  if (input > to) {
    const limit = typeof from === 'string' ? `"${to}"` : to;
    return err(`Input must be lower than ${limit}`);
  }

  if (input < from || input > to) {
    return err('From and to must be strings');
  }

  return NO_ERRORS;
}
