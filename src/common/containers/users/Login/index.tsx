import { Button, TextField } from 'material-ui';
import { observer } from 'mobx-react';
import * as React from 'react';
import useSheet from 'react-jss';
import { Link } from 'react-router-dom';
import styles from './style';

@observer
@useSheet(styles)
export class Login extends React.Component<any, any> {
  public render() {
    const { classes } = this.props.sheet;
    return (
      <div className={classes.login}>
        <div className={classes.form}>
          <TextField id="email" name="email" placeholder="E-Mail" />
          <TextField
            id="password"
            name="password"
            placeholder="Password"
            type="password"
          />
          <div className={classes.actions}>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
            <Button>Login</Button>
          </div>
        </div>
      </div>
    );
  }
}