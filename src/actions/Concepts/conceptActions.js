import actionNames from '../actionNames'

export const setSelectedConcept = (concept) => {
    return {
        type: actionNames.SET_SELECTED_CONCEPT,
        payload: concept
    }
};