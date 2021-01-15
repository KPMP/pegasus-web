import { combineReducers } from 'redux';
import { resetStateReducer } from './resetStateReducer';

const appReducer = combineReducers({
  resetStateReducer,
});

export default appReducer;
