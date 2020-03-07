import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import AnimationControls from './Components/AnimationControls';
import Controls from './Components/Controls';
import StackCanvas from './Components/StackCanvas';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <StackCanvas></StackCanvas>
        <Controls />
        <AnimationControls />
      </div>
    </Provider>
  );
}

export default App;
