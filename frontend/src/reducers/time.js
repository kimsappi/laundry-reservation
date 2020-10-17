export const setCurrentTime = time => {
  return dispatch =>
    dispatch({
      type: 'SET_CURRENT_TIME',
      data: time
    });
};

export const timeReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_CURRENT_TIME':
      return action.data;
    default:
      return state;
  }
};
