import actionNames from '../actionNames'

export const setDataType = (dataType) => {
    let shortDataType = "";
    switch (dataType) {
        case "snRNASeq":
        case "sn":
            shortDataType = "sn";
            break;
        case "scRNASeq":
        case "sc":
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
            case "sm":
                window.location.href = 'https://metaspace2020.eu/datasets?prj=0d9a6710-8389-11eb-96db-73c89a357a89&q=_SM_'; 
                break
            case "sl":
                window.location.href = 'https://metaspace2020.eu/datasets?prj=0d9a6710-8389-11eb-96db-73c89a357a89&q=_lip_'; 
                break
            case "sng":
                window.location.href = 'https://metaspace2020.eu/datasets?prj=8f102fc4-62a8-11ec-89bf-bba413a122a2&q=_glyc'; 
                break
            default:
                props.history.push('/explorer/');
        }
    }
}
