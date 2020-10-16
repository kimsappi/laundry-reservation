import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'react-redux';
import {applyMiddleware, createStore, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import Slots from './components/Slots';
import * as reducers from './reducers';

const reducer = combineReducers({
  time: reducers.timeReducer
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
    </React.StrictMode>
  </Redux.Provider>,
  document.getElementById('root')
);
