const getNewStatus = oldStatus => {
  switch(oldStatus) {
    case null:
      return 'reserving';
    case 'reserving':
      return null;
    case 'myReserved':
      return 'dereserving';
    case 'dereserving':
      return null;
    case 'reserved':
      return null;
    default:
      return oldStatus;
  }
};

export const setStatusOnClick = (date, time, machine, owner, oldStatus) => {
  // 'reserving', 'reserved', 'dereserving', 'myReserved'
  const newStatus = getNewStatus(oldStatus);
  console.warn(date, time, machine, owner ,oldStatus);

  return dispatch => {
    const action = newStatus ? {
        type: 'SET_SLOT_STATUS',
        data: {
          date, time, machine, owner, status: newStatus
        }
      } : {
        type: 'CLEAR_SLOT_STATUS',
        data: {
          date, time, machine
        }
      };
    dispatch(action);
  };
};

export const slotsReducer = (state = [], action) => {
  console.log(action)
  switch (action.type) {
    case 'SET_SLOT_STATUS':
      return [...state, action.data];
    case 'CLEAR_SLOT_STATUS':
      return state.filter(slot =>
        slot.date.getDate() !== action.data.date.getDate() ||
        slot.time !== action.data.time ||
        slot.machine !== action.data.machine
      );
    case 'CLEAR_ALL_SLOTS':
      return [];
    default:
      return state;
  }
};
