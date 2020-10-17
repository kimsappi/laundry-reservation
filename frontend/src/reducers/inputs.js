export const getStair = () => {
  const stair = localStorage.getItem('stair');
  if (stair)
    return dispatch =>
      dispatch({
        type: 'SET_INPUT',
        data: {stair}
      });
  else
    return (null);
};

export const setStair = stair => {
  localStorage.setItem('stair', stair);
  return dispatch =>
    dispatch({
      type: 'SET_STAIR',
      data: {stair}
    });
};

export const inputsReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_INPUT':
      return {...state, ...action.data};
    default:
      return state;
  }
};
