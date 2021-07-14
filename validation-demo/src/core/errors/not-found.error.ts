import { BaseError } from './error';

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message);
  }
}
