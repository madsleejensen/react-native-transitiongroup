# react-native-transitiongroup

Works similar to [ReactTransitionGroup](https://github.com/facebook/react/blob/master/src/addons/transitions/ReactTransitionGroup.js) found in `react`, but reimplemented in seperate library to work better with `react-native` 

https://github.com/reactjs/react-transition-group/issues/6

## General usage

**important** to always give your `Transition` components a unique `key`.


```js
import TransitionGroup, { FadeInOutTransition } from 'react-native-transitiongroup';
```

```jsx
<TransitionGroup>
  <FadeInOutTransition key="loader">
     {this.state.isLoading ? <Loader /> : null}
  </FadeInOutTransition>
</TransitionGroup>
```


## Custom Transitions

You can easily create your own transitions, by creating your own Transition component.
`TransitionGroup` will look for the following methods to be called on its child components to animate `enter` and `leave` 

```js
componentWillEnter(callback)
componentWillLeave(callback)
```

### example of scale in/out
```js
class ScaleInOutTransition extends Component {
  constructor() {
    super();

    this.state = {
      progress: new Animated.Value(0),
    };
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
      transform: [
        { scale: this.state.progress },
      ]
    };

    return (
      <Animated.View
        style={[this.props.style, animation]}>
        {this.props.children}
      </Animated.View>
    );
  }
}

```