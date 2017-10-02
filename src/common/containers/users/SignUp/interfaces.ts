import { IValidationError } from 'interfaces';

export enum SignUpFormName {
  Email = 'email',
  Name = 'name',
  Password = 'password',
  PasswordConfirm = 'passwordConfirm',
}

export interface ISignUpForm {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
}

export interface ISignUp extends ISignUpForm {
  errors: IValidationError['errors'];
  submitting: boolean;
}
