import actionNames from '../actionNames'

export const setDataType = (dataType) => {
    let shortDataType = "";
    switch (dataType) {
        case "snRNASeq":
            shortDataType = "sn";
            break;
        case "scRNASeq":
            shortDataType = "sc";
            break;
        default:
            shortDataType = dataType
    }
    return {
        type: actionNames.SET_DATA_TYPE,
        payload: shortDataType
    }
};
