import React, { Component, useEffect, useRef } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  addNode,
  addNodeAndAnimate,
  popNode,
  setAnimationStep,
} from '../actions/actionCreators';
import { buildList } from '../dataTypes/stack';

const Controls = props => {
  const animationStateRef = useRef(props.animationState);
  animationStateRef.current = props.animationState;

  const pushNode = function(e) {
    const nodeVal = e.target.nodeVal.value;
    props.addNodeAndAnimate(nodeVal);
    stackInterval(); // assign to var and return
  };

  const stackInterval = function() {
    const animationInterval = setInterval(() => {
      console.log(animationStateRef.current.step);
      if (
        animationStateRef.current.frame.last ||
        !animationStateRef.current.animating
      ) {
        clearInterval(animationInterval);
      } else {
        props.setAnimationStep('stack', 'push', 'next');
      }
    }, 1000);
  };

  // useEffect(() => {
  //   if (props.animationState.frame && props.animationState.frame.last) {
  //     console.log('clear');
  //     clearInterval(animationInterval);
  //   }
  // });

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          pushNode(e);
          e.target.reset();
        }}
      >
        <h2>Some Controls</h2>
        <input type="number" name="nodeVal"></input>
        <button type="submit">Add</button>
      </form>
      <button type="button" onClick={props.popNode}>
        Pop Node
      </button>
      <div className="animation-controls">
        <button
          type="button"
          onClick={() => props.setAnimationStep('stack', 'push', 'prev')}
        >
          Prev animation Step
        </button>
        <button
          type="button"
          onClick={() => props.setAnimationStep('stack', 'push', 'next')}
        >
          Next animation Step
        </button>
      </div>
    </div>
  );
};

function mapStateToProps({ nodeList, animationState }) {
  return {
    nodeList,
    animationState,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { addNode, addNodeAndAnimate, popNode, setAnimationStep },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Controls);
