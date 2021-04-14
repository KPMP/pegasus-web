import { combineReducers } from 'redux';
import { resetStateReducer } from './resetStateReducer';
import { selectedConcept, gene, cluster, cellType } from "./components/ConceptSelect/conceptReducer";
import { dataType } from "./components/DataViz/dataTypeReducer"
import { tissueType } from "./components/DataViz/tissueTypeReducer"

const appReducer = combineReducers({
  resetStateReducer,
  selectedConcept,
  dataType,
  tissueType,
  gene,
  cluster,
  cellType
});

export default appReducer;
