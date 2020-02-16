export function addNode(nodeVal) {
  return {
    type: 'ADD_NODE',
    nodeVal,
  };
}

// adds node and sets animation state to start
export function addNodeAndAnimate(nodeVal) {
  return function(dispatch) {
    dispatch(addNode(nodeVal));
    dispatch(startAnimation('stack', 'push'));
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

export function setAnimationStep(dataType, operation, stepIndex = 0) {
  return {
    type: 'SET_ANIMATION_STEP',
    dataType,
    operation,
    stepIndex,
  };
}
