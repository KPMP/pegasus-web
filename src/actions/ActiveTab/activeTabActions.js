import actionNames from "../actionNames";

export const setActiveTab = (tab) => {
    return {
        type: actionNames.SET_ACTIVE_TAB,
        payload: tab
    }
};
