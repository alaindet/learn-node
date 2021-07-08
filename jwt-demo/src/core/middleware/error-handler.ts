import { Request } from 'express';

export function errorHandler(
  error: any, // TODO: Typing
  request: Request,
  response: Response,
  next: any, // TODO: Typing
) {
  // TODO: Return 500
  console.error(error);
}
