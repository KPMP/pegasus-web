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
            dispatch((dispatch) => props.history.push("/explorer/regionalviz"));
        } else if (dataType === 'sc' || dataType === 'sn') {
            dispatch((dispatch) => props.history.push("/explorer/dataViz"));
        }
    }

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DataTypeSelector))
