import { connect } from 'react-redux';
import { IApplicationState } from 'reducers';
import { Home as Presenter } from './presenter';

function mapStateToProps(state: IApplicationState) {
  return {};
}

function mapDispatchToProps() {
  return {};
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(Presenter);
