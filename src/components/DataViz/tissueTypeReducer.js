import actionNames from '../../actions/actionNames';

export const tissueType = ( state = "", action ) => {
    switch(action.type) {
        case actionNames.SET_TISSUE_TYPE:
            return action.payload;
        default:
            return state;
    }
};