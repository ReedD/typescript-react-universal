import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import * as React from 'react';
import useSheet from 'react-jss';
import { ConnectedRouter } from 'react-router-redux';
import styles from './style';

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
    return (
      <ConnectedRouter store={this.props.store} history={this.props.history}>
        <MuiThemeProvider
          muiTheme={getMuiTheme({ userAgent: this.props.userAgent })}
        >
          <h1 className={classes.h1}>Hello World.</h1>
        </MuiThemeProvider>
      </ConnectedRouter>
    );
  }
}
