import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  pushNode, // eslint-disable-line no-shadow
  pushNodeAndAnimate,
  popNode,
  setAnimationStep,
  startAnimation,
  stopAnimation,
  toggleAnimation,
} from '../actions/actionCreators';

const Controls = props => {
  const {
    /* eslint-disable no-shadow */
    pushNode,
    pushNodeAndAnimate,
    animationState,
    nodeList,
    popNode,
    setAnimationStep,
    startAnimation,
    stopAnimation,
    toggleAnimation,
  } = props;
  /* eslint-enable no-shadow */

  const animationStateRef = useRef(animationState);
  animationStateRef.current = animationState;

  function stackInterval(type) {
    const animationInterval = setInterval(() => {
      console.log(animationStateRef.current.step);
      if (
        animationStateRef.current.frame.last ||
        !animationStateRef.current.animating
      ) {
        stopAnimation();
        if (type === 'pop') {
          popNode();
          setAnimationStep('stack', type, 'next');
        }
        // setAnimationStep('stack', 'static', 0);
        clearInterval(animationInterval);
      } else {
        setAnimationStep('stack', type, 'next');
      }
    }, 1000);
  }

  function addNode(e) {
    const nodeVal = e.target.nodeVal.value;
    if (animationState.active) {
      pushNodeAndAnimate(nodeVal);
      stackInterval('push');
    } else pushNode();
  }

  function removeNode(e) {
    if (animationState.active) {
      startAnimation('stack', 'pop');
      stackInterval('pop');
    } else {
      popNode();
    }
  }

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addNode(e);
          e.target.reset();
        }}
      >
        <h2>Some Controls</h2>
        <div>
          <input
            type="checkbox"
            name="toggle-anim"
            checked={animationState.active}
            onClick={toggleAnimation}
          />
        </div>
        <input type="number" name="nodeVal"></input>
        <button type="submit">Add</button>
      </form>
      <button type="button" onClick={removeNode}>
        Pop Node
      </button>
      <div className="animation-controls">
        <button
          type="button"
          onClick={() =>
            setAnimationStep('stack', animationState.animationType, 'prev')
          }
        >
          Prev animation Step
        </button>
        <button
          type="button"
          onClick={() =>
            setAnimationStep('stack', animationState.animationType, 'next')
          }
        >
          Next animation Step
        </button>
      </div>
    </div>
  );
};

Controls.propTypes = {
  pushNode: PropTypes.func,
  pushNodeAndAnimate: PropTypes.func,
  animationState: PropTypes.object.isRequired,
  nodeList: PropTypes.object.isRequired,
  popNode: PropTypes.func,
  setAnimationStep: PropTypes.func,
  startAnimation: PropTypes.func,
  stopAnimation: PropTypes.func,
  toggleAnimation: PropTypes.func,
};

function mapStateToProps({ nodeList, animationState }) {
  return {
    nodeList,
    animationState,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      pushNode,
      pushNodeAndAnimate,
      popNode,
      startAnimation,
      setAnimationStep,
      stopAnimation,
      toggleAnimation,
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Controls);
