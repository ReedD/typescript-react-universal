import { IValidationError } from 'interfaces';
import { actionCreator } from 'satcheljs';
import { ISignUpForm } from './interfaces';
import { SignUpFormName } from './store';

export const formChange = actionCreator(
  'FORM_CHANGE',
  (name: SignUpFormName, value: string) => ({
    name,
    value,
  }),
);

export const formSubmit = actionCreator(
  'FORM_SUBMIT',
  (data: ISignUpForm) => data,
);

export const formError = actionCreator(
  'FORM_ERROR',
  (error: IValidationError) => error,
);

export const formSubmitted = actionCreator('FORM_SUBMITTED');

export const formReset = actionCreator('FORM_RESET');
