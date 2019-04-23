import React from "react";
import classNames from "classnames";
import { Switch } from "react-router-dom";
import { animateSwitch } from "../utils";
import styles from './SlideUpSwitch.css';

class SlideUpSwitch extends React.Component {
  state = { animate: false };
  node = React.createRef();

  componentDidMount() {
    setTimeout(() => this.setState({ animate: true }), 100);
    this._animationCallback = this.props.animationCallback;

    if (this.node) {
      this.node.current.addEventListener("transitionend", this.onTransitionEnd);
    }
  }

  componentWillUnmount() {
    if (this.node) {
      this.node.current.removeEventListener("transitionend", this.onTransitionEnd);
    }
  }

  onTransitionEnd = e => {
    // the element transitions the `transform` property. Any other transitions
    // that occur on the element we can just ignore.
    if (e.propertyName !== 'transform') return;

    const callback = this._animationCallback;
    delete this._animationCallback;

    if (callback) setTimeout(callback, 0);
  };

  render() {
    return (
      <div
        ref={this.node}
        className={classNames(styles.animationInit, {
          [styles.animate]: this.state.animate
        })}
      >
        {this.props.children}
      </div>
    );
  }
}

class SlideUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      curChild: props.children,
      curUniqId: props.uniqId,
      prevChild: null,
      prevUniqId: null,
      animationCallback: null,
      noAnimation: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const prevUniqId = prevProps.uniqKey || prevProps.children.type;
    const uniqId = this.props.uniqKey || this.props.children.type;

    if (prevUniqId !== uniqId) {
      console.log({prevProps}, this.props)
      console.log("check0", this.props.children.props.children[0]);
      this.setState({
        curChild: this.props.children,
        curUniqId: uniqId,
        prevChild: prevProps.children,
        prevUniqId,
        animationCallback: this.swapChildren,
        noAnimation: uniqId === '/notanimated',
      });
    }
  }

  animationEnabled = () => this.props.children.props.children.some(child => child.props.path === this.props.uniqKey && child.type.name === 'AnimatedRoute');

  swapChildren = () => {
    this.setState({
      prevChild: null,
      prevUniqId: null,
      animationCallback: null
    });
  };

  render() {
    return (
      <div className={styles.animationContainer}>
        {!this.state.noAnimation && (this.state.prevChild || this.state.curChild)}

        {this.state.prevChild && (this.state.noAnimation ? this.state.curChild : (
          <SlideUpSwitch animationCallback={this.state.animationCallback}>
            {this.state.curChild}
          </SlideUpSwitch>)
        )}
      </div>
    );
  }
}

const AnimatedSwitch = animateSwitch(Switch, SlideUp);

export default AnimatedSwitch;
