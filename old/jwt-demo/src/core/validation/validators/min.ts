import { Validator, ValidationErrors, NoErrors } from '../types';
import { error, NO_ERRORS } from '../helpers';

const name = 'min';

const err = (message: string) => error(name, message);

export const minValidator: Validator<number> = (
  input: number,
  min: number,
): ValidationErrors | NoErrors => {

  if (input === undefined || min === undefined) {
    return err('Missing input and/or validation arguments');
  }

  if (input < min) {
    return err(`Input is lower then ${min}`);
  }

  return NO_ERRORS;
}
