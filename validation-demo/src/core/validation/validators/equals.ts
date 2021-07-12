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

    let message: string;

    switch (typeof equalToThis) {
      case 'number':
        message = `Input is not equal to ${equalToThis}`;
        break;
      case 'string':
        message = `Input is not equal to "${equalToThis}"`;
        break;
      default:
        message = 'Input is not equal validation argument';
        break;
    }

    return err(message);
  }

  return NO_ERRORS;
}
