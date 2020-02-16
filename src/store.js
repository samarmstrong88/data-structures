import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';

const defaultState = {
  nodeList: {
    1: { value: 45, next: null },
    2: { value: 25, next: 1 },
    head: { value: 10, next: 2 },
  },
  displaySettings: {
    radius: 30,
    spacing: 100,
    stageHeight: 500,
    stageWidth: 500,
    nodesPerColumn: 5,
  },
  animationState: {
    animating: false,
    animationType: 'pushStackNode',
    frame: null,
    step: 2,
    lastStep: 2,
  },
};

const store = createStore(
  rootReducer,
  defaultState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
