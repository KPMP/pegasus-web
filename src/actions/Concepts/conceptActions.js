import actionNames from '../actionNames'
import { setGene } from '../Gene/geneActions'
import { setCellType } from "../CellType/cellTypeActions";

export const setSelectedConceptState = (concept) => {
    return {
        type: actionNames.SET_SELECTED_CONCEPT,
        payload: concept
    }
};

export const setSelectedConcept = (concept) => {
    return (dispatch) => {
        dispatch(setSelectedConceptState(concept));
        if (concept.type === 'gene') {
            dispatch(setGene({ symbol: concept.value, name: concept.name }));
        } else if (concept.type === 'cell_type') {
            dispatch(setCellType(concept.value));
        }
    };
};

export const setSelectedConceptAndRedirect = (concept, props) => {
    return (dispatch) => {
        dispatch(setSelectedConcept(concept));
        switch (concept.type) {
            case "cell_type":
                window.open('/explorer/celltypesummary', '_self');
                break;
            case "gene":
                window.open('/explorer/genesummary', '_self');
                break;
            default:
                window.open('/explorer', '_self');
        }
    }
};
