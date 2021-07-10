import { NO_ERRORS } from '../helpers';
import { ValidationSchema, ClassValidationErrors, NoErrors, Validator, ValidationRule } from '../types';
import { VALIDATORS } from '../validators';

export class ClassValidator {

  private _input: any;
  private _schema: ValidationSchema;
  private _isValid = false;

  set input(input: any) {
    this._input = input;
  }

  set schema(schema: ValidationSchema) {
    this._schema = schema;
  }

  get isValid(): boolean {
    return this._isValid;
  }

  validate(): ClassValidationErrors | NoErrors {

    let errors: ClassValidationErrors = {};

    for (const key in this._schema) {
      const inputValue = this._input[key];
      const rules = this._schema[key];

      for (const _rule in rules) {
        const rule = _rule as ValidationRule;
        const ruleValue = rules[rule];
        const validator = VALIDATORS[rule];
        const validatorErrors = validator(inputValue, ruleValue);
        errors = { ...errors, validatorErrors };
      }
    }

    return Object.keys(errors).length ? errors : NO_ERRORS;
  }
}
