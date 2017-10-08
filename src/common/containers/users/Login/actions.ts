import { IValidationError } from 'interfaces';
import { actionCreator } from 'satcheljs';
import { ILoginForm, LoginFormName } from './interfaces';

export const formChange = actionCreator(
  'users.login.formChange',
  (name: LoginFormName, value: string) => ({
    name,
    value,
  })
);

export const formSubmit = actionCreator(
  'users.login.formSubmit',
  (data: ILoginForm) => data
);

export const formError = actionCreator(
  'users.login.formError',
  (error: IValidationError) => error
);

export const formSubmitted = actionCreator('FORM_SUBMITTED');

export const formReset = actionCreator('FORM_RESET');
