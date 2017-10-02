import { Button, TextField } from 'material-ui';
import { observer } from 'mobx-react';
import * as React from 'react';
import useSheet from 'react-jss';
import { Link } from 'react-router-dom';
import { dispatch } from 'satcheljs';
import { formChange, formSubmit } from './actions';
import getStore, { SignUpFormName } from './store';
import styles from './style';

type ChangeEvent = React.SyntheticEvent<HTMLElement>;

export interface ISignUpProps {
  sheet?: any;
}

@useSheet(styles)
@observer
export default class SignUp extends React.Component<ISignUpProps, undefined> {
  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, name, password } = getStore();
    dispatch(formSubmit({ email, name, password }));
  };

  onChange = (name: SignUpFormName) => (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    dispatch(formChange(name, target.value));
  };

  render() {
    const { classes } = this.props.sheet;
    const { email, name, password, errors } = getStore();
    return (
      <form onSubmit={this.onSubmit} className={classes.signUp}>
        <div className={classes.form}>
          <TextField
            error={!!errors.name}
            helperText={errors.name && errors.name.message}
            onChange={this.onChange(SignUpFormName.Name)}
            placeholder="Name"
            value={name}
          />
          <TextField
            error={!!errors.email}
            helperText={errors.email && errors.email.message}
            onChange={this.onChange(SignUpFormName.Email)}
            placeholder="E-Mail"
            value={email}
          />
          <TextField
            error={!!errors.password}
            helperText={errors.password && errors.password.message}
            onChange={this.onChange(SignUpFormName.Password)}
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
