import { connect } from 'react-redux';
import SamplesByDataTypeTable from './SamplesByDataTypeTable';
import { setDataTypeAndRedirect } from '../../actions/DataType/dataTypeActions'
import { withRouter } from 'react-router';
import { resetState } from "../../actions/resetAction";

const mapStateToProps = (state, props) =>
({
    selectedDataType: state.selectedDataType,
    featureSCData: state.featureSCData
});

const mapDispatchToProps = (dispatch, props) =>
({
    setDataType(concept, featureSCData) {
        dispatch(resetState());
          dispatch(setDataTypeAndRedirect(concept, featureSCData, props));
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SamplesByDataTypeTable))
