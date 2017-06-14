import { RaisedButton, TextField } from 'material-ui';
import * as React from 'react';
import useSheet from 'react-jss';
import { RouteProps } from 'react-router';
import { Link } from 'react-router-dom';
import styles from './style';

export enum SignUpFormInputName {
  NAME = 'name' as any,
  EMAIL = 'email' as any,
  PASSWORD = 'password' as any,
}

export interface ISignUpStateProps {
  name?: string;
  password?: string;
  email?: string;
  sheet?: any;
}

export interface ISignUpDispatchProps {
  formUpdate?: any;
}

export interface ISignUpProps extends ISignUpStateProps, ISignUpDispatchProps {}

@useSheet(styles)
export class SignUp extends React.Component<any, any> {
  public render() {
    const { classes } = this.props.sheet;
    const formUpdate = (name: SignUpFormInputName) => {
      return (e: React.FormEvent<any>, value: string) => {
        return this.props.formUpdate(name, value);
      };
    };
    return (
      <div className={classes.signUp}>
        <div className={classes.form}>
          <TextField
            id={String(SignUpFormInputName.NAME)}
            name={String(SignUpFormInputName.NAME)}
            hintText="Name"
            value={this.props.name}
            onChange={formUpdate(SignUpFormInputName.NAME)}
          />
          <TextField
            id={String(SignUpFormInputName.EMAIL)}
            name={String(SignUpFormInputName.EMAIL)}
            hintText="E-Mail"
            value={this.props.email}
            onChange={formUpdate(SignUpFormInputName.EMAIL)}
          />
          <TextField
            id={String(SignUpFormInputName.PASSWORD)}
            name={String(SignUpFormInputName.PASSWORD)}
            hintText="Password"
            type="password"
            value={this.props.password}
            onChange={formUpdate(SignUpFormInputName.PASSWORD)}
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
