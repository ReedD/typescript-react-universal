import { observer } from 'mobx-react';
import * as React from 'react';
import useSheet from 'react-jss';
import { Link } from 'react-router-dom';
import styles from './style';

@observer
@useSheet(styles)
export default class Home extends React.Component<any, any> {
  public render() {
    const { classes } = this.props.sheet;
    return (
      <div>
        <h1>Home</h1>
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    );
  }
}
