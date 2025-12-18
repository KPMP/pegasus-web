import actionNames from "../actionNames"


export const setFeatureSTData = (featureSTData) => {
    return {
        type: actionNames.SET_ST_SWTICH,
        payload: featureSTData
    }
}