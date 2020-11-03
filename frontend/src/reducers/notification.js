import * as utils from '../utils';
import React from 'react';

export const setNotification = (data, success = false, seconds = 3) => {
  const id = Math.random().toString(36).substring(2, 15);

  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: data,
      success: success,
      id: id
    });
    setTimeout(() => dispatch({
      type: 'CLEAR_NOTIFICATION',
      id: id
    }), seconds * 1000);
  };
};

const createReservationNotification = (data, cancellation, success = false, seconds = 5) => {
  const typeText = cancellation ? 'Cancellation' : 'Reservation';
  const successText = success ? 'succeeded' : 'failed';

  const list = data.map(item => {
    const date = utils.dateStringToObject(item.date);

    return (
      <li>{date.toLocaleDateString()}, {item.time}, {item.machine}</li>
    );
  });

  return setNotification(
    <>
      <div>{typeText} {successText}:</div>
      <ul>{list}</ul>
    </>,
    success, seconds
  );
};

export const createReservationNotifications = data => {
  const successReservation = data.success.filter(item => item.type === 'reservation');
  const successCancellation = data.success.filter(item => item.type === 'cancellation');
  const failureReservation = data.failure.filter(item => item.type === 'reservation');
  const failureCancellation = data.failure.filter(item => item.type === 'cancellation');

  return dispatch => {
    if (successReservation.length)
      dispatch(createReservationNotification(successReservation, false, true));
    if (successCancellation.length)
      dispatch(createReservationNotification(successCancellation, true, true));
    if (failureReservation.length)
      dispatch(createReservationNotification(failureReservation, true, false));
    if (failureCancellation.length)
      dispatch(createReservationNotification(failureCancellation, true, false));
  };
};

export const notificationReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return [...state, {
        data: action.data,
        success: action.success,
        id: action.id
      }];
    case 'CLEAR_NOTIFICATION':
      return state.filter(item => item.id !== action.id);
    default:
      return state;
  }
};
