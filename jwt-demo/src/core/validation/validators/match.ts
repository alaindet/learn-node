import { Validator, ValidationErrors, NoErrors } from '../types';
import { error, NO_ERRORS } from '../helpers';

const name = 'equals';

const err = (message: string) => error(name, message);

export const matchValidator: Validator<string> = (
  input: string,
  regex: RegExp,
): ValidationErrors | NoErrors => {

  if (input === undefined || regex === undefined) {
    return err('Missing input and/or validation arguments');
  }

  if (!(typeof input === 'string')) {
    return err('Input must be of type string');
  }

  if (!regex.test(input)) {
    return err('Input does not match given regular expression');
  }

  return NO_ERRORS;
}
