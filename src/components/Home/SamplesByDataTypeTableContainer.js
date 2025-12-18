import { connect } from 'react-redux';
import SamplesByDataTypeTable from './SamplesByDataTypeTable';
import { setDataTypeAndRedirect } from '../../actions/DataType/dataTypeActions'
import { withRouter } from 'react-router';
import { resetState } from "../../actions/resetAction";

const mapStateToProps = (state, props) =>
({
    selectedDataType: state.selectedDataType,
    featureSTData: state.featureSTData
});

const mapDispatchToProps = (dispatch, props) =>
({
    setDataType(concept, featureSTData) {
        dispatch(resetState());
          dispatch(setDataTypeAndRedirect(concept, featureSTData, props));
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SamplesByDataTypeTable))
