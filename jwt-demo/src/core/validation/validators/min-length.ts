import { Validator, ValidationErrors, NoErrors } from '../types';
import { error, NO_ERRORS } from '../helpers';

const name = 'maxLength';

const err = (message: string) => error(name, message);

export const minLengthValidator: Validator<any[] | string> = (
  input: any[] | string,
  minLength: number,
): ValidationErrors | NoErrors => {

  if (input === undefined || minLength === undefined) {
    return err('Missing input and/or validation arguments');
  }

  if (input.length < minLength) {
    return err(`Input length is lower then ${minLength}`);
  }

  return NO_ERRORS;
}
