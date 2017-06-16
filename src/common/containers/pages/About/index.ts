import { connect } from 'react-redux';
import { IApplicationState } from 'reducers';
import { About as Presenter } from './About';

function mapStateToProps(state: IApplicationState) {
  return {};
}

function mapDispatchToProps() {
  return {};
}

export const About = connect(mapStateToProps, mapDispatchToProps)(Presenter);
