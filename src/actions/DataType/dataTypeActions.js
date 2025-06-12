import actionNames from '../actionNames';

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
        case "rt":
            shortDataType = "rt";
            break;
        case "rp":
            shortDataType = "rp";
            break;
        default:
            shortDataType = "sc"
    }
    return {
        type: actionNames.SET_DATA_TYPE,
        payload: shortDataType
    }
};

export const setDataTypeAndRedirect = (dataType, props) => {
    return (dispatch) => {
        switch (dataType) {
            case "Single-cell RNA-seq (scRNA-seq)":
                dispatch(setDataType("sc"));
                window.open('/explorer/dataviz', '_self');
                break;
            case "Single-nucleus RNA-seq (snRNA-seq)":
                dispatch(setDataType("sn"));
                window.open('/explorer/dataviz', '_self');
                break;
            case "Regional transcriptomics":
                dispatch(setDataType("rt"));
                window.open('/explorer/regionalviz', '_self');
                break;
            case "Regional proteomics":
                dispatch(setDataType("rp"));
                window.open("/explorer/regionalpro", "_self");
                break;
            case "Spatial Metabolomics":
                window.open('https://metaspace2020.eu/datasets?prj=0d9a6710-8389-11eb-96db-73c89a357a89&q=_SM_', '_blank');
                break
            case "Spatial Lipidomics":
                window.open('https://metaspace2020.eu/datasets?prj=0d9a6710-8389-11eb-96db-73c89a357a89&q=_lip_', '_blank');
                break
            case "Spatial N-glycomics":
                window.open('https://metaspace2020.eu/datasets?prj=8f102fc4-62a8-11ec-89bf-bba413a122a2&q=_glyc', '_blank');
                break
            case "Segmentation Masks & Pathomics Vectors":
                var linkVariable = "PAS%20(Segmentation%20Masks)";
                window.open('/spatial-viewer/size=n_20_n&filters%5B0%5D%5Bfield%5D=imagetype&filters%5B0%5D%5Bvalues%5D%5B0%5D=' + linkVariable +'&filters%5B0%5D%5Btype%5D=any', '_self')
            default:
                var linkVariable = dataType.replaceAll(" ", "%20")
                window.open('/spatial-viewer/?size=n_20_n&filters%5B0%5D%5Bfield%5D=datatype&filters%5B0%5D%5Bvalues%5D%5B0%5D='+ linkVariable +'&filters%5B0%5D%5Btype%5D=any', '_self')
                break
        }
    }
}
