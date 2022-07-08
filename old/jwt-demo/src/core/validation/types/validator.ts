import { NoErrors, ValidationErrors } from './errors';
import { ValidationRule } from './rule';

export type Validator<T = any> =  (input: T, ...args: any[]) => (
  | ValidationErrors
  | NoErrors
);

export type Validators = Record<ValidationRule, Validator>;
