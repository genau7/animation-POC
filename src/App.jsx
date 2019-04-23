import React, { Component } from 'react';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import First from './components/First';
import Second from './components/Second';
import Home from './components/Home';
import SlideUpSwitch from './components/SlideUpSwitch';
// import AnimatedRoute from './components/AnimatedRoute';

import styles from './App.css';

export default class App extends Component {
  render() {
    return (
      <HashRouter>
      <div className={styles.self}>
        <SlideUpSwitch location={location}>
          <Route path="/first" component={First}/>
          <Route path="/second" component={Second}/>
          <Route path="/notanimated" component={First}/>
          <Route path="/" component={Home}/>
        </SlideUpSwitch>
      </div>
      </HashRouter>
    )
  }
}
