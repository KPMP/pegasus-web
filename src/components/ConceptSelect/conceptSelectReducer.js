import actionNames from '../../actions/actionNames';

export const selectedConcept = ( state = {}, action ) => {
    switch(action.type) {
        case actionNames.SET_SELECTED_CONCEPT:
            return action.payload;
        default:
            return state;
    }
};