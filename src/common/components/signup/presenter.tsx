import { RaisedButton, TextField } from 'material-ui';
import * as React from 'react';
import useSheet from 'react-jss';
import { RouteProps } from 'react-router';
import { Link } from 'react-router-dom';
import styles from './style';

export interface ISignUpStateProps {
  name?: string;
  password?: string;
  email?: string;
  sheet?: any;
}

export interface ISignUpDispatchProps {
  updateEmail?: any;
  updateName?: any;
  updatePassword?: any;
}

export interface ISignUpProps extends ISignUpStateProps, ISignUpDispatchProps {}

@useSheet(styles)
export class SignUp extends React.Component<any, any> {
  public render() {
    const { classes } = this.props.sheet;
    return (
      <div className={classes.signUp}>
        <div className={classes.form}>
          <TextField
            id="name"
            name="name"
            hintText="Name"
            value={this.props.name}
            onChange={this.props.updateName}
          />
          <TextField
            id="email"
            name="email"
            hintText="E-Mail"
            value={this.props.email}
            onChange={this.props.updateEmail}
          />
          <TextField
            id="password"
            name="password"
            hintText="Password"
            type="password"
            value={this.props.password}
            onChange={this.props.updatePassword}
          />
          <div className={classes.actions}>
            <Link to="/login">
              <RaisedButton label="Login" />
            </Link>
            <RaisedButton label="Sign Up" primary={true} />
          </div>
        </div>
      </div>
    );
  }
}
