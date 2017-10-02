import { createStore } from 'satcheljs';
import { ISignUp } from './interfaces';

export default createStore<ISignUp>('signUp', {
  email: '',
  errors: {},
  name: '',
  password: '',
  passwordConfirm: '',
  submitting: false,
});
