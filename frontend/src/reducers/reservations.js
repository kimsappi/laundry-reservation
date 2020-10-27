const setReservationsStatusIfUndefined = (reservations, status) => 
  reservations.map(reservation => typeof reservation.status === 'undefined' ?
    {...reservation, status} : reservation
  );
;

export const setOldReservations = data => {
  return dispatch => {
    dispatch({
      type: 'SET_OLD_RESERVATIONS',
      data: setReservationsStatusIfUndefined(data.reservations, 'reserved')
    });
    dispatch({
      type: 'SET_CURRENT_TIME',
      data: {
        time: data.time,
        date: data.date
      }
    });
  };
};

export const reservationsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_OLD_RESERVATIONS':
      return action.data;
    default:
      return state;
  }
};
