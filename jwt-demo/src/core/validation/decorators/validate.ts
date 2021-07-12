import { RequestInput } from '../types';
import { createRequestInputValidator } from './create-request-input-validator';

export const Validate = {
  UriParameters: createRequestInputValidator(RequestInput.UriParameters),
  QueryString: createRequestInputValidator(RequestInput.QueryString),
  Body: createRequestInputValidator(RequestInput.Body),
};
