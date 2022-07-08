import { ValidationSchema, ClassValidationErrors, NoErrors, ValidationRule } from '../types';
import { NO_ERRORS } from '../helpers';
import { VALIDATORS } from '../validators';

export class ClassValidator {

  private _input: any;
  private _schema: ValidationSchema;
  private _isValid = false;
  private _errors: ClassValidationErrors | NoErrors = NO_ERRORS;

  set input(input: any) {
    this._input = input;
  }

  set schema(schema: ValidationSchema) {
    this._schema = schema;
  }

  get isValid(): boolean {
    return this._isValid;
  }

  get errors(): ClassValidationErrors | NoErrors {
    return this._errors;
  }

  constructor(input?: any, schema?: ValidationSchema) {
    if (input) {
      this._input = input;
    }

    if (schema) {
      this._schema = schema;
    }
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
        const validatorErrors = Array.isArray(ruleValue)
          ? validator(inputValue, ...ruleValue)
          : validator(inputValue, ruleValue);
        
        if (validatorErrors !== null) {
          errors[key] = validatorErrors;
        }
      }
    }

    if (Object.keys(errors).length) {
      this._errors = errors;
      this._isValid = false;
    }
    
    else {
      this._errors = NO_ERRORS;
      this._isValid = true;
    }

    return this._errors;
  }
}
