import { combineReducers } from 'redux';
import { resetStateReducer } from './resetStateReducer';
import { selectedConcept } from "./components/ConceptSelect/conceptSelectReducer";
import { dataType } from "./components/DataViz/dataTypeReducer"
import { tissueType } from "./components/DataViz/tissueTypeReducer"

const appReducer = combineReducers({
  resetStateReducer,
  selectedConcept,
  dataType,
  tissueType
});

export default appReducer;
