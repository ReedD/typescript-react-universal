import { IValidationError } from 'interfaces';
import { createStore } from 'satcheljs';

export interface ISignUp {
  email: string;
  errors: IValidationError['errors'];
  name: string;
  password: string;
  submitting: boolean;
}

export default createStore<ISignUp>('signUp', {
  email: '',
  errors: {},
  name: '',
  password: '',
  submitting: false,
});
