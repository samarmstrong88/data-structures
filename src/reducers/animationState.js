import {
  getAnimationFrame,
  getLastAnimationStep,
} from '../animation/animationSteps.js';

const initialAnimationState = getAnimationFrame('stack', 'static', 0);

const animationState = (state = initialAnimationState, action) => {
  switch (action.type) {
    case 'TOGGLE_ANIMATION':
      return {
        ...state,
        active: !state.active,
      };
    case 'START_ANIMATION':
      return {
        ...state,
        animationType: action.operation,
        animating: true,
        step: 0,
        lastStep: getLastAnimationStep(action.dataType, action.operation),
        frame: getAnimationFrame(action.dataType, action.operation, 0),
      };
    case 'STOP_ANIMATION':
      return {
        ...state,
        animating: false,
        // animationType: 'static',
      };
    case 'SET_ANIMATION_STEP': {
      const lastFrameIndex = getLastAnimationStep(
        action.dataType,
        action.operation
      );
      let newStep;
      console.log(lastFrameIndex, action.stepIndex);
      if (action.stepIndex === 'next' && state.step < state.lastStep) {
        newStep = state.step + 1;
      } else if (action.stepIndex === 'prev' && state.step >= 1) {
        newStep = state.step - 1;
      } else if (action.stepIndex >= 0 && action.stepIndex <= state.lastStep) {
        newStep = action.stepIndex;
      } else newStep = state.step;
      return {
        ...state,
        step: newStep,
        frame: getAnimationFrame(action.dataType, action.operation, newStep),
      };
    }
    default:
      return state;
  }
};

export default animationState;
