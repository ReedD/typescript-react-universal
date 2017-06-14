import { Map } from 'immutable';
import { IUser } from 'interfaces/user';
import { Reducer } from 'redux';
import { ISignUpAction } from './actions';
import * as ActionType from './constants';

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
  action: ISignUpAction,
) => {
  let newState: any = Map(state);
  switch (action.type) {
    case ActionType.SIGNUP_FORM_UPDATE:
      newState = newState.set(action.name, action.value);
      break;
  }
  return newState.toObject();
};

export default signup;
