import signup, { ISignUpState } from 'containers/users/SignUp/reducer';
import { combineReducers } from 'redux';

export interface IApplicationState {
  signup?: ISignUpState;
}

export default combineReducers({
  signup,
});
