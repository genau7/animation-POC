import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../App.css';

const renderMenu = () => (
  <ul className={styles.navMenu}>
    <li><Link to="/">Home link</Link></li>
    <li><Link to="first">First link</Link></li>
    <li><Link to="second">Second link</Link></li>
    <li><Link to="notanimated">No animation</Link></li>
  </ul>
);

export default renderMenu;
