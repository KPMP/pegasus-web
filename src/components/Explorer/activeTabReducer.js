import actionNames from "../../actions/actionNames";

export const activeTab = (state = '1', action) => {
    switch (action.type) {
        case actionNames.SET_ACTIVE_TAB:
            return action.payload;
        case actionNames.RESET_STATE:
            return '1';
        default:
            return state;
    }
};
