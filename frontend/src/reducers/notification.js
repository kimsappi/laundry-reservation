export const setNotification = data => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: data
    });
  };
};

export const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data;
    default:
      return state;
  }
};
