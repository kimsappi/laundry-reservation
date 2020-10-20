export const setOwner = (owner = null) => {
  return dispatch =>
    dispatch({
      type: 'SET_OWNER',
      data: owner
    });
};

export const ownerReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_OWNER':
      return action.data;
    default:
      return state;
  }
};
