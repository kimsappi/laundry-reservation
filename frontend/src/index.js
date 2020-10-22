import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'react-redux';
import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

import './index.css';
import Slots from './components/Slots';
import Inputs from './components/Inputs';
import { timeReducer } from './reducers/time';
import { slotsReducer } from './reducers/slots';
import { ownerReducer } from './reducers/owner';

const reducer = combineReducers({
  time: timeReducer,
  slots: slotsReducer,
  owner: ownerReducer
});

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk)
  )
);

const getAndLogRes = async () => {
  try {
    const res = await axios.get('http://localhost:8000/api/reservations');
    console.log(res.data);
  } catch(err) {
    console.error(err);
  }
};

ReactDOM.render(
  <Redux.Provider store={store}>
    <React.StrictMode>
      <Slots />
      <Inputs />
      <button onClick={getAndLogRes}>Get Reservations</button>
    </React.StrictMode>
  </Redux.Provider>,
  document.getElementById('root')
);
