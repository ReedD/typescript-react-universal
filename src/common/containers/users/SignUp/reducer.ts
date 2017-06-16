import { IUser } from 'interfaces';
import { Action, Reducer } from 'redux';
import { isType } from 'typescript-fsa';
import { formSubmit, formUpdate, signUpComplete } from './actions';

export interface ISignUpState extends IUser {
  submitting: boolean;
  password: string;
}

const initialState: ISignUpState = {
  email: '',
  name: '',
  password: '',
  submitting: false,
};

const signup: Reducer<ISignUpState> = (
  state = initialState,
  action: Action,
) => {
  if (isType(action, formUpdate)) {
    return { ...state, [action.payload.name]: action.payload.value };
  } else if (isType(action, formSubmit)) {
    return { ...state, submitting: true };
  } else if (isType(action, signUpComplete)) {
    return { ...state, submitting: false };
  } else {
    return state;
  }
};

export default signup;
