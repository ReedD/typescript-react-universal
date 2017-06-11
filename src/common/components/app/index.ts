import { connect } from 'react-redux';
import { IApplicationState } from 'reducers';
import { App as Presenter } from './presenter';

function mapStateToProps(state: IApplicationState) {
  return { userAgent: state.browser.userAgent };
}

function mapDispatchToProps() {
  return {};
}

export const App = connect(mapStateToProps, mapDispatchToProps)(Presenter);
