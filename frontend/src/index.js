import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'react-redux';
import {applyMiddleware, createStore, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import Slots from './components/Slots';
import Inputs from './components/Inputs';
import {timeReducer} from './reducers/time';
import {inputsReducer} from './reducers/inputs';

const reducer = combineReducers({
  time: timeReducer,
  inputs: inputsReducer
});

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk)
  )
);

ReactDOM.render(
  <Redux.Provider store={store}>
    <React.StrictMode>
      <Slots />
      <Inputs />
    </React.StrictMode>
  </Redux.Provider>,
  document.getElementById('root')
);
