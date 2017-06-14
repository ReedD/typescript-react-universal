import { RaisedButton, TextField } from 'material-ui';
import * as React from 'react';
import useSheet from 'react-jss';
import { Link } from 'react-router-dom';
import styles from './style';

@useSheet(styles)
export class Login extends React.Component<any, any> {
  public render() {
    const { classes } = this.props.sheet;
    return (
      <div className={classes.login}>
        <div className={classes.form}>
          <TextField id="email" name="email" hintText="E-Mail" />
          <TextField
            id="password"
            name="password"
            hintText="Password"
            type="password"
          />
          <div className={classes.actions}>
            <Link to="/signup">
              <RaisedButton label="Sign Up" />
            </Link>
            <RaisedButton label="Login" primary={true} />
          </div>
        </div>
      </div>
    );
  }
}
