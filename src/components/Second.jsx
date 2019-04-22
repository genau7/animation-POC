import React, { PureComponent } from 'react';

import NavMenu from './NavMenu';
import styles from '../App.css';

export default class Second extends PureComponent {
  render() {
    return (
      <div className={styles.second}>
        <NavMenu />
        This is the second route
      </div>
    )
  }
}
