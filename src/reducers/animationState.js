import {
  getAnimationFrame,
  getLastAnimationStep,
} from '../animation/animationSteps.js';

const initialAnimationState = null;

const animationState = (state = initialAnimationState, action) => {
  switch (action.type) {
    case 'START_ANIMATION':
      return {
        ...state,
        animating: true,
        animationType: action.animationType,
        step: 0,
        frame: getAnimationFrame(action.dataType, action.operation, 0),
      };
    case 'STOP_ANIMATION':
      return {
        ...state,
        animating: false,
        animationType: 'static',
      };
    case 'SET_ANIMATION_STEP':
      const lastFrameIndex = getLastAnimationStep(
        action.dataType,
        action.operation
      );
      let newStep;
      console.log(lastFrameIndex, action.stepIndex);
      if (action.stepIndex === 'next' && state.step < lastFrameIndex) {
        newStep = state.step + 1;
      } else if (action.stepIndex === 'prev' && state.step >= 1) {
        newStep = state.step - 1;
      } else if (action.stepIndex >= 0 && action.stepIndex <= lastFrameIndex) {
        newStep = action.stepIndex;
      } else newStep = state.step;
      return {
        ...state,
        step: newStep,
        frame: getAnimationFrame(action.dataType, action.operation, newStep),
      };

    default:
      return state;
  }
};

export default animationState;
