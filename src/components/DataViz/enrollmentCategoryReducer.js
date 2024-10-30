import actionNames from '../../actions/actionNames';

export const enrollmentCategory = ( state = "", action ) => {
    switch(action.type) {
        case actionNames.SET_ENROLLMENT_CATEGORY:
            return action.payload;
        default:
            return state;
    }
};