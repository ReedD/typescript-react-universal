import { noop } from 'lodash';
import { RaisedButton, TextField } from 'material-ui';
import * as React from 'react';
import useSheet from 'react-jss';
import { RouteProps } from 'react-router';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import styles from './style';

enum SignUpFormInputName {
  Email = 'email',
  Name = 'name',
  Password = 'password',
}

export interface IUpdatePayload {
  name: string;
  value: string;
}

export interface ISignUpFormData {
  email?: string;
  name?: string;
  password?: string;
}

export interface ISignUpStateProps extends ISignUpFormData {
  sheet?: any;
}

export interface ISignUpDispatchProps {
  formSubmit?: (form: ISignUpFormData) => any;
  formUpdate?: (change: IUpdatePayload) => any;
}

export interface ISignUpProps extends ISignUpStateProps, ISignUpDispatchProps, RouteComponentProps<
  any
> {}

@useSheet(styles)
export class SignUp extends React.Component<ISignUpProps, undefined> {
  public static defaultProps = {
    formSubmit: noop,
    formUpdate: noop,
  };

  public render() {
    const { classes } = this.props.sheet;
    const formSubmit = this.formSubmit.bind(this);
    const formUpdate = this.formUpdate.bind(this);
    return (
      <div className={classes.signUp}>
        <div className={classes.form}>
          <TextField
            id={SignUpFormInputName.Name}
            name={SignUpFormInputName.Name}
            hintText="Name"
            value={this.props.name}
            onChange={formUpdate(SignUpFormInputName.Name)}
          />
          <TextField
            id={SignUpFormInputName.Email}
            name={SignUpFormInputName.Email}
            hintText="E-Mail"
            value={this.props.email}
            onChange={formUpdate(SignUpFormInputName.Email)}
          />
          <TextField
            id={SignUpFormInputName.Password}
            name={SignUpFormInputName.Password}
            hintText="Password"
            type="password"
            value={this.props.password}
            onChange={formUpdate(SignUpFormInputName.Password)}
          />
          <div className={classes.actions}>
            <Link to="/login">
              <RaisedButton label="Login" />
            </Link>
            <RaisedButton label="Sign Up" onClick={formSubmit} primary={true} />
          </div>
        </div>
      </div>
    );
  }
  private formSubmit() {
    this.props.formSubmit({
      email: this.props.name,
      name: this.props.name,
      password: this.props.name,
    });
  }
  private formUpdate(name: SignUpFormInputName) {
    return (e: React.FormEvent<HTMLInputElement>, value: string) => {
      return this.props.formUpdate({ name, value });
    };
  }
}
