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
    formUpdate: bindActionCreators(SignUpActions.formUpdate, dispatch),
  };
};

export const SignUp = connect(mapStateToProps, mapDispatchToProps)(Presenter);
