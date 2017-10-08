import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { observer } from 'mobx-react';
import * as React from 'react';
import useSheet from 'react-jss';
import { Link } from 'react-router-dom';
import { dispatch } from 'satcheljs';
import { formChange, formReset, formSubmit } from './actions';
import { LoginFormName } from './interfaces';
import getStore from './store';
import styles from './style';

type ChangeEvent = React.SyntheticEvent<HTMLElement>;

export interface ILoginProps {
  sheet?: any;
}

@useSheet(styles)
@observer
export default class Login extends React.Component<ILoginProps> {
  componentWillUnmount() {
    dispatch(formReset());
  }

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = getStore();
    dispatch(formSubmit({ email, password }));
  };

  onChange = (name: LoginFormName) => (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    dispatch(formChange(name, target.value));
  };

  render() {
    const { classes } = this.props.sheet;
    const { email, password, errors } = getStore();
    return (
      <form onSubmit={this.onSubmit} className={classes.login}>
        <div className={classes.form}>
          <TextField
            error={!!errors.email}
            helperText={errors.email && errors.email.message}
            onChange={this.onChange(LoginFormName.Email)}
            placeholder="E-Mail"
            value={email}
          />
          <TextField
            error={!!errors.password}
            helperText={errors.password && errors.password.message}
            onChange={this.onChange(LoginFormName.Password)}
            placeholder="Password"
            type="password"
            value={password}
          />
          <div className={classes.actions}>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
            <Button type="submit" raised={true} color="primary">
              Login
            </Button>
          </div>
        </div>
      </form>
    );
  }
}
