import { ValidationRule } from './rule';

export interface ValidationSchema {
  [key: string]: ValidationRule;
}
