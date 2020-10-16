import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'react-redux';
import {createStore} from 'redux';

import './index.css';
import Slots from './components/Slots';

const store = createStore(
  () => {}
);

ReactDOM.render(
  <Redux.Provider store={store}>
    <React.StrictMode>
      <Slots />
    </React.StrictMode>
  </Redux.Provider>,
  document.getElementById('root')
);
