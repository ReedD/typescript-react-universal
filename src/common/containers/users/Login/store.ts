import { createStore } from 'satcheljs';
import { ILogin } from './interfaces';

export default createStore<ILogin>('login', {
  email: '',
  errors: {},
  password: '',
  submitting: false,
});
