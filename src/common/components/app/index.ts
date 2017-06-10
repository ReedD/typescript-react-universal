import { connect } from 'react-redux';
import { App as Presenter } from './presenter';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}

export const App = connect(mapStateToProps, mapDispatchToProps)(Presenter);
