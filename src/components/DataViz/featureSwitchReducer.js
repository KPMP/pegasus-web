import actionNames from '../../actions/actionNames';
import initialState from "../../initialState.json"


export const featureSCData = ( state = initialState.featureSCData, action ) => {
    switch(action.type) {
        case actionNames.SET_SC_SWITCH:
            return action.payload;
        default:
            return state;
    }
};

