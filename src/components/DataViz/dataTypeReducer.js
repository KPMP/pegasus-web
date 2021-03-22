import actionNames from '../../actions/actionNames';

export const dataType = ( state = "", action ) => {
    switch(action.type) {
        case actionNames.SET_DATA_TYPE:
            return action.payload;
        default:
            return state;
    }
};