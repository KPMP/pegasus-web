import { combineReducers } from 'redux';
import { selectedConcept, gene, cluster, cellType } from "./components/ConceptSelect/conceptReducer";
import { dataType } from "./components/DataViz/dataTypeReducer"
import { enrollmentCategory } from "./components/DataViz/enrollmentCategoryReducer"
import { accession } from "./components/DataViz/accessionReducer";
import { featureSTData } from './components/FeatureSwitch/featureSwitchReducer';


const appReducer = combineReducers({
  selectedConcept,
  dataType,
  enrollmentCategory,
  gene,
  cluster,
  cellType,
  accession,
  featureSTData
})

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STATE') {
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}

export default rootReducer;
