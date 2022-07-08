import { Request, Response } from 'express';

// https://expressjs.com/en/guide/error-handling.html
export function errorHandler(
  error: any, // TODO: Typing
  request: Request,
  response: Response,
  next: any, // TODO: Typing
) {
  console.error(error);
  return response.status(500).send({ message: error.message});
}
