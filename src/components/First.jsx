import React, { PureComponent } from 'react';
import { Switch, Route, Link } from 'react-router-dom';


import NavMenu from './NavMenu';
import styles from '../App.css';

export default class First extends PureComponent {
  render() {
    return (
      <div className={styles.first}>
        <NavMenu/>
        This is the first route and its second nav:
        <ul>
          <li><Link to="/first/nested1">Nested1</Link></li>
          <li><Link to="/first/nested2">Nested2(animated)</Link></li>
        </ul>
        <Switch>
           <Route path="/first/nested1" render={() => (<div>Nested1</div>)} />
           <Route path="/first/nested2" render={() => (<div>Nested2</div>)} />
        </Switch>
      </div>
    )
  }
}
