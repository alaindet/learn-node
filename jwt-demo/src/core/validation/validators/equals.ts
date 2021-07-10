import { Validator, ValidationErrors, NoErrors } from '../types';
import { error, NO_ERRORS } from '../helpers';

const name = 'equals';

const err = (message: string) => error(name, message);

export const equalsValidator: Validator<any> = (
  input: any,
  equalToThis: any,
): ValidationErrors | NoErrors => {

  if (input === undefined || equalToThis === undefined) {
    return err('Missing input and/or validation arguments');
  }

  if (input !== equalToThis) {
    return err(
      ['string', 'number'].includes(typeof equalToThis)
        ? `Input is not equal to "${equalToThis}"`
        : 'Input is not equal validation argument'
    );
  }

  return NO_ERRORS;
}
