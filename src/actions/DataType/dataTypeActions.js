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

export const setDataTypeAndRedirect = (dataType, props) => {
    return (dispatch) => {
        dispatch(setDataType(dataType));
        switch (dataType) {
            case "sn":
                props.history.push('/explorer/dataviz');
                break;
            case "sc":
                props.history.push('/explorer/dataviz');
                break;
            case "rt":
                props.history.push('/explorer/regionalviz');
                break;
            case "rp":
                props.history.push('/explorer/regionalviz');
                break;
            default:
                props.history.push('/explorer/');
        }
    }
}
