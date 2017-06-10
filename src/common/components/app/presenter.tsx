import * as React from 'react';
import useSheet from 'react-jss';
import styles from './style';

@useSheet(styles)
export class App extends React.Component<any, any> {
  public render() {
    const { classes } = this.props.sheet;
    return <h1 className={classes.h1}>Hello World.</h1>;
  }
}
