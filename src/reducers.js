import { combineReducers } from 'redux';
import { selectedConcept, gene, cluster, cellType } from "./components/ConceptSelect/conceptReducer";
import { dataType } from "./components/DataViz/dataTypeReducer"
import { tissueType } from "./components/DataViz/tissueTypeReducer"


const appReducer = combineReducers({
  selectedConcept,
  dataType,
  tissueType,
  gene,
  cluster,
  cellType
})

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STATE') {
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}

export default appReducer;
