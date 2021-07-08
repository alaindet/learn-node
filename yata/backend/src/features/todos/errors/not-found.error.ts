import { DatabaseError } from './database.error';

export class NotFoundError extends DatabaseError {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}
