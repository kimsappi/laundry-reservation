export const setOldReservations = oldReservations => {
  return dispatch => 
    dispatch({
      type: 'SET_OLD_RESERVATIONS',
      data: oldReservations
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
