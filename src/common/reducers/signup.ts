import { ISignUpAction } from 'actions/signup';
import * as ActionType from 'constants/actionTypes';
import { Map } from 'immutable';
import { IUser } from 'interfaces/user';
import { Reducer } from 'redux';

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
    case ActionType.SIGNUP_UPDATE_EMAIL:
      newState = newState.set('email', action.value);
      break;
    case ActionType.SIGNUP_UPDATE_NAME:
      newState = newState.set('name', action.value);
      break;
    case ActionType.SIGNUP_UPDATE_PASSWORD:
      newState = newState.set('password', action.value);
      break;
  }
  return newState.toObject();
};

export default signup;
