import React, { Component } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  View,
} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

/**
 * Used to wrap in child components of ReactTransitionGroup, to specify the animation for enter / leave.
 */
class FadeInOutTransition extends Component {
  constructor() {
    super();

    this.state = {
      progress: new Animated.Value(0),
    };
  }

  componentWillAppear(callback) {
    this.componentWillEnter(callback);
  }

  componentWillEnter(callback) {
    Animated.timing(this.state.progress, {
      toValue: 1,
      delay: this.props.inDelay,
      easing: this.props.easing,
      duration: this.props.inDuration,
    }).start(callback);
  }

  componentWillLeave(callback) {
    Animated.timing(this.state.progress, {
      toValue: 0,
      delay: this.props.outDelay,
      easing: this.props.easing,
      duration: this.props.outDuration,
    }).start(callback);
  }

  render() {
    const animation = {
      opacity: this.state.progress,
    };

    return (
      <Animated.View
        pointerEvents={this.props.pointerEvents}
        style={[styles.container, this.props.style, animation]}>
        {this.props.children}
      </Animated.View>
    );
  }
}

FadeInOutTransition.defaultProps = {
  inDuration: 250,
  inDelay: 0,
  outDuration: 150,
  outDelay: 0,
  easing: Easing.linear(),
  pointerEvents: 'box-none',
};

FadeInOutTransition.propTypes = {
  style: View.propTypes.style,
  pointerEvents: React.PropTypes.string,
  inDuration: React.PropTypes.number,
  inDelay: React.PropTypes.number,
  outDuration: React.PropTypes.number,
  outDelay: React.PropTypes.number,
  easing: React.PropTypes.func,
};

export default FadeInOutTransition;
