import { boundActionCreator } from 'satcheljs';
import { ISignUpForm } from './interfaces';

type FormName = 'name' | 'email' | 'password';

export const formChange = boundActionCreator(
  'FORM_CHANGE',
  (name: FormName, value: string) => ({
    name,
    value,
  }),
);

export const formSubmit = boundActionCreator(
  'FORM_SUBMIT',
  (data: ISignUpForm) => data,
);

export const formSubmitted = boundActionCreator('FORM_SUBMITTED');

export const formReset = boundActionCreator('FORM_RESET');
