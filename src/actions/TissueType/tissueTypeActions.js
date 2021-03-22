import actionNames from '../actionNames'

export const setTissueType = (tissueType) => {
    return {
        type: actionNames.SET_TISSUE_TYPE,
        payload: tissueType
    }
};
