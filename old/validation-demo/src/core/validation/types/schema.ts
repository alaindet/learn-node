import { ValidationRule } from './rule';

export type ValidationSchema = Partial<{
  [key: string]: {
    [rule in ValidationRule]?: any;
  };
}>;
