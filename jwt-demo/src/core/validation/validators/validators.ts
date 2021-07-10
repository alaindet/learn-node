import { Validators  } from '../types';
import { betweenValidator } from './between';
import { equalsValidator } from './equals';
import { exceptValidator } from './except';
import { inValidator } from './in';
import { matchValidator } from './match';
import { maxLengthValidator } from './max-length';
import { maxValidator } from './max';
import { minLengthValidator } from './min-length';
import { minValidator } from './min';
import { requiredValidator } from './required';
import { typeValidator } from './type';

export const VALIDATORS: Validators = {
  between: betweenValidator,
  equals: equalsValidator,
  except: exceptValidator,
  in: inValidator,
  match: matchValidator,
  maxLength: maxLengthValidator,
  max: maxValidator,
  minLength: minLengthValidator,
  min: minValidator,
  required: requiredValidator,
  type: typeValidator,
};
