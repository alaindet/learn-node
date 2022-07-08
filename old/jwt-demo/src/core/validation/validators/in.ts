import { Validator, ValidationErrors, NoErrors } from '../types';
import { error, NO_ERRORS } from '../helpers';

const name = 'in';

const err = (message: string) => error(name, message);

export const inValidator: Validator<string | number> = (
  input: string | number,
  ...allowed: (string | number)[]
): ValidationErrors | NoErrors => {

  if (input === undefined || allowed === undefined) {
    return err('Missing input and/or validation arguments');
  }

  if (!allowed.length) {
    return err('Allowed list is empty');
  }

  if (typeof input !== (typeof allowed[0])) {
    return err('Input and allowed list must be of the same type');
  }

  if (!allowed.includes(input)) {

    if (typeof allowed[0] === 'string') {
      const list = allowed.join(', ');
      return err(`Input is not in the list: ${list}`);
    }

    return err('Input is not in the allowed list');
  }

  return NO_ERRORS;
}
