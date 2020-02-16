import React from 'react';
import { Provider } from 'react-redux';

import StackCanvas from './Components/StackCanvas'
import Controls from './Components/Controls';
import './App.css';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <StackCanvas>
        </StackCanvas>
        <Controls />
      </div>
    </Provider>
  );
}

export default App;
