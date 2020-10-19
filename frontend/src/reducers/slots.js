export const setStatusOnClick = (date, time, machine, owner) => {
  return dispatch =>
    dispatch({
      type: 'SET_SLOT_STATUS',
      data: {
        date, time, machine, owner, status: 'reserving'
      }
    });
};

export const slotsReducer = (state = [], action) => {
  console.log(action)
  switch (action.type) {
    case 'SET_SLOT_STATUS':
      return [...state, action.data];
    default:
      return state;
  }
};
