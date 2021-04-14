import actionNames from '../../actions/actionNames';

export const selectedConcept = ( state = {}, action ) => {
    switch(action.type) {
        case actionNames.SET_SELECTED_CONCEPT:
            return action.payload;
        default:
            return state;
    }
};

export const gene = ( state = {}, action ) => {
    switch(action.type) {
        case actionNames.SET_GENE:
            return action.payload;
        default:
            return state;
    }
};

export const cluster = ( state = "", action ) => {
    switch(action.type) {
        case actionNames.SET_CLUSTER:
            return action.payload;
        default:
            return state;
    }
};
export const cellType = ( state = "", action ) => {
    switch(action.type) {
        case actionNames.SET_CELL_TYPE:
            return action.payload;
        default:
            return state;
    }
};
