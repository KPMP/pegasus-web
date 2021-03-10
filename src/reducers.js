import { combineReducers } from 'redux';
import { resetStateReducer } from './resetStateReducer';
import { selectedConcept } from "./components/ConceptSelect/conceptSelectReducer";

const appReducer = combineReducers({
  resetStateReducer,
  selectedConcept
});

export default appReducer;
