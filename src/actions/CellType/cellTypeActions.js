import actionNames from "../actionNames";

export const setCellType = (cellType) => {
    return {
        type: actionNames.SET_CELL_TYPE,
        payload: cellType
    }
};