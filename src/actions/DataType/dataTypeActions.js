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
                props.history.push('/dataviz');
                break;
            case "sc":
                props.history.push('/dataviz');
                break;
            case "rt":
                props.history.push('/regionalviz');
                break;
            case "rp":
                props.history.push('/regionalviz');
                break;
            default:
                props.history.push('/');
        }
    }
}
