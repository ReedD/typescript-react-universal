import { combineReducers } from 'redux';
import signup, { ISignUpState } from './signup';

export interface IApplicationState {
  signup?: ISignUpState;
}

export default combineReducers({
  signup,
});
