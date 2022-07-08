import { Validator, ValidationErrors, NoErrors } from '../types';
import { error, NO_ERRORS } from '../helpers';

const name = 'max';

const err = (message: string) => error(name, message);

export const maxValidator: Validator<number> = (
  input: number,
  max: number,
): ValidationErrors | NoErrors => {

  if (input === undefined || max === undefined) {
    return err('Missing input and/or validation arguments');
  }

  if (input > max) {
    return err(`Input is greater then ${max}`);
  }

  return NO_ERRORS;
}
