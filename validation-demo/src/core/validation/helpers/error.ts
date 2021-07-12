import { ValidationErrors } from '../types';

export function error(name: string, message: string): ValidationErrors {
  return { [name]: message };
}
