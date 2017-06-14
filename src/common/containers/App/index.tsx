import { About } from 'containers/About';
import { Home } from 'containers/Home';
import { Login } from 'containers/users/Login';
import { SignUp } from 'containers/users/SignUp';
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import * as React from 'react';
import useSheet from 'react-jss';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import styles from './style';

injectTapEventPlugin();

export interface IAppProps {
  store: any;
  history: any;
  userAgent: any;
  sheet?: any;
}

@useSheet(styles)
export class App extends React.Component<IAppProps, undefined> {
  public render() {
    const { classes } = this.props.sheet;
    const muiTheme = getMuiTheme({
      userAgent: this.props.userAgent,
    });
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <MuiThemeProvider muiTheme={muiTheme}>
            <div>
              <Route exact={true} path="/" component={Home} />
              <Route exact={true} path="/about" component={About} />
              <Route exact={true} path="/signup" component={SignUp} />
              <Route exact={true} path="/login" component={Login} />
            </div>
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}
