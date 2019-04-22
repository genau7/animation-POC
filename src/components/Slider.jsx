import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from "./Slider.css";

export const DIRECTION = {
  CENTER: "CENTER",
  TO_LEFT: "TO_LEFT",
  TO_RIGHT: "TO_RIGHT",
  FROM_LEFT: "FROM_LEFT",
  FROM_RIGHT: "FROM_RIGHT",
}

export default class Slider extends Component {
  static propTypes = {
    position: PropTypes.string.isRequired, // one of direction values
    animationCallback: PropTypes.string,
    children: PropTypes.node,

  };

  state = {
    animating: false,
    position: DIRECTION.CENTER,
    animationPrepNeeded: false,
  };

  node = null;
  _animationCallback = null;
  _postPrepareTimeout = null;

  componentDidMount() {
    this.startAnimation(this.props.position);
    if (this.node) {
      this.node.addEventListener("transitionend", this.onTransitionEnd);
    }
  }

  componentWillUnmount() {
    if (this.node) {
      this.node.removeEventListener("transitionend", this.onTransitionEnd);
    }
  }

  componentWillReceiveProps(newProps) { // TODO rewrite with new lifecycle method
    if (newProps.position !== this.props.position) {
      this.startAnimation(newProps.position, newProps.animationCallback);
    }
  }

  startAnimation = (position, animationCallback) => {
    const noAnimation = position === DIRECTION.CENTER;
    const animatingOut = [DIRECTION.TO_LEFT, DIRECTION.TO_RIGHT].includes(position);
    const currentlyIn = [
      DIRECTION.CENTER,
      DIRECTION.FROM_LEFT,
      DIRECTION.FROM_RIGHT
    ].includes(this.state.position);
    if (noAnimation || (currentlyIn && animatingOut)) {
      // in these cases we don't need to prepare our animation at all, we can just
      // run straight into it
      this._animationCallback = animationCallback;
      return this.setState({
        animationPrepNeeded: false,
        position,
      });
    }

    this._animationCallback = this.postPrepareAnimation;
    // in case the transition fails, we also post-prepare after some ms (whichever
    // runs first should cancel the other)
    this._postPrepareTimeout = setTimeout(this.postPrepareAnimation, 500);

    this.setState({
      animating: true,
      animationPrepNeeded: true,
      position,
    });
  }

  postPrepareAnimation = () => {
    clearTimeout(this._postPrepareTimeout);
    this._animationCallback = null;

    this.setState(
      { animationPrepNeeded: false },
      () => (this._animationCallback = this.props.animationCallback)
    );
  }

  onTransitionEnd = e => {
    // the Slider transitions the `transform` property. Any other transitions
    // that occur on the element we can just ignore.
    if (e.propertyName !== "transform") return;

    const callback = this._animationCallback;
    delete this._animationCallback;

    // an animation callback is another animation, so we only set `animating` to
    // `false` when we finish the follow-up animation
    if (callback) setTimeout(callback, 0);
    else this.setState({ animating: false });
  }

  render() {
    return (
      <div
        ref={node => (this.node = node)}
        className={classNames(styles.animate, {
          [styles.to]: [DIRECTION.TO_LEFT, DIRECTION.TO_RIGHT].includes(
            this.state.position
          ),
          [styles.from]: [DIRECTION.FROM_LEFT, DIRECTION.FROM_RIGHT].includes(
            this.state.position
          ),
          [styles.right]: [DIRECTION.TO_RIGHT, DIRECTION.FROM_RIGHT].includes(
            this.state.position
          ),
          [styles.left]: [DIRECTION.TO_LEFT, DIRECTION.FROM_LEFT].includes(
            this.state.position
          ),
          [styles.prepare]: this.state.animationPrepNeeded
        })}
        data-qa-loading={Boolean(
          this.props["data-qa-loading"] || this.state.animating
        )}
      >
        <div className={this.props.className}>{this.props.children}</div>
      </div>
    );
  }
}


