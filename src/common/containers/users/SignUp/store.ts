import { createStore } from 'satcheljs';

export interface ISignUp {
  email: string;
  name: string;
  password: string;
  submitting: boolean;
}

export default createStore<ISignUp>('signUp', {
  email: '',
  name: '',
  password: '',
  submitting: false,
});
