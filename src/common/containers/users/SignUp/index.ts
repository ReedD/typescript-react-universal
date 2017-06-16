import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { IApplicationState } from 'reducers';
import { bindActionCreators, Dispatch } from 'redux';
import * as SignUpActions from './actions';
import {
  ISignUpDispatchProps,
  ISignUpStateProps,
  SignUp as Presenter,
} from './SignUp';

const mapStateToProps: MapStateToProps<ISignUpStateProps, undefined> = (
  state: IApplicationState,
) => {
  return state.signup;
};

const mapDispatchToProps: MapDispatchToProps<
  ISignUpDispatchProps,
  undefined
> = (dispatch: Dispatch<IApplicationState>) => {
  return {
    formSubmit: bindActionCreators(SignUpActions.formSubmit, dispatch),
    formUpdate: bindActionCreators(SignUpActions.formUpdate, dispatch),
  };
};

export const SignUp = connect(mapStateToProps, mapDispatchToProps)(Presenter);
