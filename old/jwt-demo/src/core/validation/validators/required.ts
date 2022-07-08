import { Validator, ValidationErrors, NoErrors } from '../types';
import { error, NO_ERRORS } from '../helpers';

const name = 'equals';

const err = (message: string) => error(name, message);

export const requiredValidator: Validator<any> = (
  input: any,
  required: boolean = true,
): ValidationErrors | NoErrors => {

  if (input === undefined && required) {
    return err('Missing input and/or validation arguments');
  }

  return NO_ERRORS;
}
