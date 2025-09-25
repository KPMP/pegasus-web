import actionNames from '../../actions/actionNames';
import initialState from "../../initialState.json"
export const featureSNData = ( state = initialState.featureSNData, action ) => {
    switch(action.type) {
        case actionNames.SET_SN_SWITCH:
            return action.payload;
        default:
            return state;
    }
};

export const featureSCData = ( state = initialState.featureSCData, action ) => {
    switch(action.type) {
        case actionNames.SET_SC_SWITCH:
            return action.payload;
        default:
            return state;
    }
};

export const featureNewCellClusterData = (state = initialState.featureNewCellClusterData, action) => {
    switch(action.type) {
        case actionNames.SET_NEW_CELL_CLUSTER_SWITCH:
            return action.payload;
        default:
            return state;
    }
};
