import { connect } from 'react-redux';
import { IApplicationState } from 'reducers';
import { Login as Presenter } from './Login';

function mapStateToProps(state: IApplicationState) {
  return {};
}

function mapDispatchToProps() {
  return {};
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(Presenter);
