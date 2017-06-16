import { IUser } from 'interfaces/user';
import { Reducer } from 'redux';
import { ISignUpUpdateAction, SignUpAction } from './actions';

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
  action: ISignUpUpdateAction,
) => {
  switch (action.type) {
    case SignUpAction.Update:
      return { ...state, [action.payload.name]: action.payload.value };
    default:
      return state;
  }
};

export default signup;
