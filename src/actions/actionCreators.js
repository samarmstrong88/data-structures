export function pushNode(nodeVal) {
  return {
    type: 'PUSH_NODE',
    nodeVal,
  };
}

export function popNode() {
  return {
    type: 'POP_NODE',
  };
}

export function startAnimation(dataType, operation) {
  return {
    type: 'START_ANIMATION',
    dataType,
    operation,
  };
}
export function stopAnimation() {
  return {
    type: 'STOP_ANIMATION',
  };
}

export function toggleAnimation() {
  return {
    type: 'TOGGLE_ANIMATION',
  };
}
// adds node and sets animation state to start
export function pushNodeAndAnimate(nodeVal) {
  return function(dispatch) {
    dispatch(pushNode(nodeVal));
    dispatch(startAnimation('stack', 'push'));
  };
}

export function setAnimationStep(dataType, operation, stepIndex = 0) {
  return {
    type: 'SET_ANIMATION_STEP',
    dataType,
    operation,
    stepIndex,
  };
}
