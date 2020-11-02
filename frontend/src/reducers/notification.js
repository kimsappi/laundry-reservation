export const setNotification = (data, success = false) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: data,
      success: success
    });
  };
};

export const notificationReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return [...state, {
        data: action.data,
        success: action.success
      }];
    default:
      return state;
  }
};
