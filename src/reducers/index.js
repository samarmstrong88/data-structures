import { combineReducers } from 'redux';

import nodeList from './nodeList';
import displaySettings from './displaySettings';
import animationState from './animationState';

// import jobFilters from './jobFilters';
// import testFilter from './testFilter';
// import jobs from './jobs';

const rootReducer = combineReducers({
  nodeList,
  displaySettings,
  animationState,
});

export default rootReducer;
