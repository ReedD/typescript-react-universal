export interface IErrorFields {
  [key: string]: {
    message: string;
  };
}

export default class AppError extends Error {
  errors: IErrorFields;

  constructor(message?: string, errors: IErrorFields = {}) {
    super(message);
    this.errors = errors;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  toJSON() {
    return { message: this.message, errors: this.errors };
  }
}
