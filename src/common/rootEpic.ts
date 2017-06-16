import { signUpEpic } from 'containers/users/SignUp/actions';
import { combineEpics } from 'redux-observable';

export default combineEpics(signUpEpic);
