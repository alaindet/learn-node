export type ValidationErrorMessage = string | null;

export interface ValidationErrors {
  [errorName: string]: ValidationErrorMessage;
}

export interface ClassValidationErrors {
  [attribute: string]: ValidationErrors | null;
}

export type NoErrors = null;
