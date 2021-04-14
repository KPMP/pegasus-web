import actionNames from "../actionNames";

export const setGene = (gene) => {
    return {
        type: actionNames.SET_GENE,
        payload: gene
    }
};