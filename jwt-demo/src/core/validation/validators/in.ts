import { Validator, ValidationErrors, NoErrors } from '../types';
import { error, NO_ERRORS } from '../helpers';

const name = 'in';

const err = (message: string) => error(name, message);

export const inValidator: Validator<string | number> = (
  input: string | number,
  whitelist: (string | number)[],
): ValidationErrors | NoErrors => {

  if (input === undefined || whitelist === undefined) {
    return err('Missing input and/or validation arguments');
  }

  if (!whitelist.length) {
    return err('Whitelist is empty');
  }

  if (typeof input !== (typeof whitelist[0])) {
    return err('Input and whitelist must be of the same type');
  }

  if (!whitelist.includes(input)) {
    return err('Input is not in the whitelist');
  }

  return NO_ERRORS;
}
