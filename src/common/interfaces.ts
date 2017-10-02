export interface IUser {
  id?: string;
  email?: string;
  name?: string;
}

export interface IValidationError {
  errors: {
    [key: string]: {
      kind: string;
      message: string;
      name: string;
      path: string;
      properties: {
        path: string;
        message: string;
        type: string;
        value: string;
      };
      value: string;
    };
  };
  message: string;
  name: string;
}
