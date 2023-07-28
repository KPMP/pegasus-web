import actionNames from './actions/actionNames';
import loadedState from './initialState';

export const resetStateReducer = (state = {}, action) => {
  switch (action.type) {
    case actionNames.RESET_STATE:
      return {};
    default:
      return state;
  }
};
