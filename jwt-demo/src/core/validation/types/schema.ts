import { ValidationRule } from './rule';

export interface ValidationSchema {
  [key: string]: {
    [rule in ValidationRule]: any;
  };
}
