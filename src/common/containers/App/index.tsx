import { About } from 'containers/pages/About';
import { Home } from 'containers/pages/Home';
import { Login } from 'containers/users/Login';
import SignUp from 'containers/users/SignUp';
import { create } from 'jss';
import preset from 'jss-preset-default';
import { MuiThemeProvider } from 'material-ui/styles';
import * as React from 'react';
import useSheet, { JssProvider } from 'react-jss';
import { Route } from 'react-router-dom';
import { jss, sheetsRegistry, theme } from 'styles';
import styles from './style';

@useSheet(styles)
export class App extends React.Component {
  public render() {
    return (
      <JssProvider registry={sheetsRegistry} jss={jss}>
        <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
          <div>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/about" component={About} />
            <Route exact={true} path="/signup" component={SignUp} />
            <Route exact={true} path="/login" component={Login} />
          </div>
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}
