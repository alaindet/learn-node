import { Validator, ValidationErrors, NoErrors } from '../types';
import { error, NO_ERRORS } from '../helpers';

const name = 'maxLength';

const err = (message: string) => error(name, message);

export const maxLengthValidator: Validator<any[] | string> = (
  input: any[] | string,
  maxLength: number,
): ValidationErrors | NoErrors => {

  if (input === undefined || maxLength === undefined) {
    return err('Missing input and/or validation arguments');
  }

  if (input.length > maxLength) {
    return err(`Input length is greater then ${maxLength}`);
  }

  return NO_ERRORS;
}
