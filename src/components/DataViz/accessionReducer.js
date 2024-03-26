import actionNames from '../../actions/actionNames';

export const accession = ( state = "", action ) => {
    switch(action.type) {
        case actionNames.SET_ACCESSION:
            return action.payload;
        default:
            return state;
    }
};
