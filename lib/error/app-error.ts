export type FieldErrors = Record<string, string>;

export class AppError extends Error {
  code: string;
  status: number;
  fields?: FieldErrors;

  constructor(code: string, status = 400, fields?: FieldErrors) {
    super(code);
    this.code = code;
    this.status = status;
    this.fields = fields;
  }
}
