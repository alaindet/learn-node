import { BaseError } from './error';

export class UniqueConstraintError extends BaseError {
  constructor(message: string) {
    super(message);
  }
}
