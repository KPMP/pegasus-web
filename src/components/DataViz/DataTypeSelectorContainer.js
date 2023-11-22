import { connect } from 'react-redux';
import DataTypeSelector from './DataTypeSelector';
import { withRouter } from 'react-router';
import { setTissueType } from '../../actions/TissueType/tissueTypeActions'
import { setDataType } from "../../actions/DataType/dataTypeActions";

const mapStateToProps = (state, props) =>
({
    tissueType: state.tissueType,
    dataType: state.dataType,
    gene: state.gene,
    isLoadingUmap: props.isLoadingUmap
});

const mapDispatchToProps = (dispatch, props) =>
({
    setTissueType(tissueType) {
        dispatch(setTissueType(tissueType));
    },
    setDataType(dataType) {
        dispatch(setDataType(dataType));
        if (dataType === 'rt') {
            dispatch((dispatch) => window.open("/explorer/regionalviz", "_self"));
        } else if (dataType === 'sc' || dataType === 'sn') {
            dispatch((dispatch) => window.open("/explorer/dataViz", "_self"));
        }
        else if(dataType === "rp"){
          dispatch((dispatch) => window.open("/regionalpro", "_self"));
        } 
    }

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DataTypeSelector))
