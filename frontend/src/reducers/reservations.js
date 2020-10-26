const setReservationsStatusIfUndefined = (reservations, status) => 
  reservations.map(reservation => typeof reservation.status === 'undefined' ?
    {...reservation, status} : reservation
  );
;

export const setOldReservations = oldReservations => {
  return dispatch => 
    dispatch({
      type: 'SET_OLD_RESERVATIONS',
      data: setReservationsStatusIfUndefined(oldReservations, 'reserved')
    });
};

export const reservationsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_OLD_RESERVATIONS':
      return action.data;
    default:
      return state;
  }
};
