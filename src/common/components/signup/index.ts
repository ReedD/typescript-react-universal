import * as SignUpActions from 'actions/signup';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { IApplicationState } from 'reducers';
import { bindActionCreators, Dispatch } from 'redux';
import {
  ISignUpDispatchProps,
  ISignUpStateProps,
  SignUp as Presenter,
} from './presenter';

const mapStateToProps: MapStateToProps<ISignUpStateProps, any> = (
  state: IApplicationState,
) => {
  return state.signup;
};

const mapDispatchToProps: MapDispatchToProps<ISignUpDispatchProps, any> = (
  dispatch: Dispatch<IApplicationState>,
) => {
  return {
    updateEmail: bindActionCreators(SignUpActions.updateEmail, dispatch),
    updateName: bindActionCreators(SignUpActions.updateName, dispatch),
    updatePassword: bindActionCreators(SignUpActions.updatePassword, dispatch),
  };
};

export const SignUp = connect(mapStateToProps, mapDispatchToProps)(Presenter);
