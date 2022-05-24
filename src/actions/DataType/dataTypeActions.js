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
            case "wsi":
                window.open('/spatial-viewer/?size=n_1000_n&filters%5B0%5D%5Bfield%5D=datatype&filters%5B0%5D%5Bvalues%5D%5B0%5D=Light%20Microscopic%20Whole%20Slide%20Images&filters%5B0%5D%5Btype%5D=any')
                break;
            case "3d":
                window.open('/spatial-viewer/?size=n_1000_n&filters[0][field]=datatype&filters[0][values][0]=3D Tissue Imaging and Cytometry&filters[0][type]=any')
                break;
            case "codex":
                window.open('/spatial-viewer/?size=n_1000_n&filters[0][field]=datatype&filters[0][values][0]=CODEX&filters[0][type]=any')
                break;
            case "sm":
                window.open('https://metaspace2020.eu/datasets?prj=0d9a6710-8389-11eb-96db-73c89a357a89&q=_SM_', '_blank');
                break
            case "sl":
                window.open('https://metaspace2020.eu/datasets?prj=0d9a6710-8389-11eb-96db-73c89a357a89&q=_lip_', '_blank');
                break
            case "sng":
                window.open('https://metaspace2020.eu/datasets?prj=8f102fc4-62a8-11ec-89bf-bba413a122a2&q=_glyc', '_blank');
                break
            default:
                props.history.push('/explorer/');
        }
    }
}
