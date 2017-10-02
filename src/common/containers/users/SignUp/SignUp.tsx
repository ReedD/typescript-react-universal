import { Button, TextField } from 'material-ui';
import { observer } from 'mobx-react';
import * as React from 'react';
import useSheet from 'react-jss';
import { Link } from 'react-router-dom';
import { dispatch } from 'satcheljs';
import { formChange, formSubmit } from './actions';
import getStore from './store';
import styles from './style';

type EventHandler = React.ReactEventHandler<HTMLElement>;

export interface ISignUpProps {
  sheet?: any;
}

@useSheet(styles)
@observer
export default class SignUp extends React.Component<ISignUpProps, undefined> {
  emailInput: HTMLInputElement;
  nameInput: HTMLInputElement;
  passwordInput: HTMLInputElement;

  emailInputRef = (input: HTMLInputElement) => (this.emailInput = input);
  nameInputRef = (input: HTMLInputElement) => (this.nameInput = input);
  passwordInputRef = (input: HTMLInputElement) => (this.passwordInput = input);

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, name, password } = getStore();
    dispatch(formSubmit({ email, name, password }));
  };

  onChange: EventHandler = ({ target }) => {
    switch (target) {
      case this.nameInput:
        dispatch(formChange('name', this.nameInput.value));
        break;
      case this.emailInput:
        dispatch(formChange('email', this.emailInput.value));
        break;
      case this.passwordInput:
        dispatch(formChange('password', this.passwordInput.value));
        break;
    }
  };

  render() {
    const { classes } = this.props.sheet;
    const { email, name, password, errors } = getStore();
    return (
      <form onSubmit={this.onSubmit} className={classes.signUp}>
        <div className={classes.form}>
          <TextField
            error={!!errors.name}
            helperText={errors.email && errors.email.message}
            inputRef={this.nameInputRef}
            onChange={this.onChange}
            placeholder="Name"
            value={name}
          />
          <TextField
            error={!!errors.email}
            helperText={errors.email && errors.email.message}
            inputRef={this.emailInputRef}
            onChange={this.onChange}
            placeholder="E-Mail"
            value={email}
          />
          <TextField
            error={!!errors.password}
            helperText={errors.password && errors.password.message}
            inputRef={this.passwordInputRef}
            onChange={this.onChange}
            placeholder="Password"
            type="password"
            value={password}
          />
          <div className={classes.actions}>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Button type="submit">Sign Up</Button>
          </div>
        </div>
      </form>
    );
  }
}
