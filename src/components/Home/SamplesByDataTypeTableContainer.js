import { connect } from 'react-redux';
import SamplesByDataTypeTable from './SamplesByDataTypeTable';
import { setDataTypeAndRedirect } from '../../actions/DataType/dataTypeActions'
import { withRouter } from 'react-router';
// import { resetState } from "../../actions/resetAction";

const mapStateToProps = (state, props) =>
({
    selectedDataType: state.selectedDataType,
});

const mapDispatchToProps = (dispatch, props) =>
({
    setDataType(concept) {
        // dispatch(resetState());
        dispatch(setDataTypeAndRedirect(concept, props));
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SamplesByDataTypeTable))