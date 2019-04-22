import React, { PureComponent } from 'react';

import NavMenu from './NavMenu';
import styles from '../App.css';

export default class First extends PureComponent {
  render() {
    return (
      <div className={styles.first}>
        <NavMenu/>
        This is the first route
      </div>
    )
  }
}
