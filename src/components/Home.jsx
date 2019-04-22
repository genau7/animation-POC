import React, { PureComponent } from 'react';

import NavMenu from './NavMenu';
import styles from '../App.css';

export default class Home extends PureComponent {
  render() {
    return (
      <div className={styles.home}>
        <NavMenu/>
        This is the home page
      </div>
    )
  }
}
