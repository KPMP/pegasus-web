import actionNames from "../../actions/actionNames";
import initialState from "../../initialState.json";

export const featureSTData = (state = initialState.featureSTData, action) => {
    switch(action.type) {
        case actionNames.SET_ST_SWTICH:
            return action.payload;
        default:
            return state;   
    }
}