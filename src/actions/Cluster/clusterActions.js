import actionNames from "../actionNames";

export const setCluster = (cluster) => {
    return {
        type: actionNames.SET_CLUSTER,
        payload: cluster
    }
};