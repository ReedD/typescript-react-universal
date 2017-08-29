import { About } from 'containers/pages/About';
import { Home } from 'containers/pages/Home';
import { Login } from 'containers/users/Login';
import SignUp from 'containers/users/SignUp';
import * as React from 'react';
import useSheet from 'react-jss';
import { Route } from 'react-router-dom';
import styles from './style';

@useSheet(styles)
export class App extends React.Component<undefined, undefined> {
  public render() {
    return (
      <div>
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/about" component={About} />
        <Route exact={true} path="/signup" component={SignUp} />
        <Route exact={true} path="/login" component={Login} />
      </div>
    );
  }
}
