import actionNames from '../actionNames'

export const setSelectedConcept = (concept) => {
    return {
        type: actionNames.SET_SELECTED_CONCEPT,
        payload: concept
    }
};

export const setSelectedConceptAndRedirect = (concept, props) => {
    return (dispatch) => {
        dispatch(setSelectedConcept(concept));
        switch (concept.type) {
            case "cell_type":
                props.history.push('/celltypesummary');
                break;
            case "gene":
                props.history.push('/genesummary');
                break;
            default:
                props.history.push('/');
        }
    }

};
