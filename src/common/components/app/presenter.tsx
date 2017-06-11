import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as React from 'react';
import useSheet from 'react-jss';
import styles from './style';

@useSheet(styles)
export class App extends React.Component<any, any> {
  public render() {
    const { classes } = this.props.sheet;
    return (
      <MuiThemeProvider
        muiTheme={getMuiTheme({ userAgent: this.props.userAgent })}
      >
        <h1 className={classes.h1}>Hello World.</h1>
      </MuiThemeProvider>
    );
  }
}
