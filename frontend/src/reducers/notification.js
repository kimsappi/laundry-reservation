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
