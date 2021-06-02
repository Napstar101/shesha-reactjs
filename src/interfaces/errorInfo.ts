export interface IValidationErrorInfo {
  message?: string | null;
  members?: string | null[] | null;
}

export interface IErrorInfo {
  code?: number | null;
  message?: string | null;
  details?: string | null;
  validationErrors?: IValidationErrorInfo[] | null;
}
