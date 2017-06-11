import { connect } from 'react-redux';
import { App as Presenter } from './presenter';

function mapStateToProps(state: any) {
  return { userAgent: state.browser.userAgent };
}

function mapDispatchToProps() {
  return {};
}

export const App = connect(mapStateToProps, mapDispatchToProps)(Presenter);
