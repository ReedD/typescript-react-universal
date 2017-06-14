import * as React from 'react';
import useSheet from 'react-jss';
import { Link } from 'react-router-dom';
import styles from './style';

@useSheet(styles)
export class About extends React.Component<any, any> {
  public render() {
    const { classes } = this.props.sheet;
    return (
      <div>
        <h1>About</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
      </div>
    );
  }
}
