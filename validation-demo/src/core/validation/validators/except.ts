import { Validator, ValidationErrors, NoErrors } from '../types';
import { error, NO_ERRORS } from '../helpers';

const name = 'except';

const err = (message: string) => error(name, message);

export const exceptValidator: Validator<string | number> = (
  input: any,
  notEqualToThis: any,
): ValidationErrors | NoErrors => {

  if (input === undefined || notEqualToThis === undefined) {
    return err('Missing input and/or validation arguments');
  }

  if (input === notEqualToThis) {
    return err(
      ['string', 'number'].includes(typeof notEqualToThis)
        ? `Input is equal to "${notEqualToThis}"`
        : 'Input is equal validation argument'
    );
  }

  return NO_ERRORS;
}
