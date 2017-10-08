import { IValidationError } from 'interfaces';

export enum LoginFormName {
  Email = 'email',
  Password = 'password',
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface ILogin extends ILoginForm {
  errors: IValidationError['errors'];
  submitting: boolean;
}
