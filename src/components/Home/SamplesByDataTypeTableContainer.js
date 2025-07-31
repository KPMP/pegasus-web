import { connect } from 'react-redux';
import SamplesByDataTypeTable from './SamplesByDataTypeTable';
import { setDataTypeAndRedirect, setDataTypeAndRedirectFeatureData } from '../../actions/DataType/dataTypeActions'
import { withRouter } from 'react-router';
import { resetState } from "../../actions/resetAction";

const mapStateToProps = (state, props) =>
({
    selectedDataType: state.selectedDataType,
    featureSNData: state.featureSNData,
    featureSCData: state.featureSCData
});

const mapDispatchToProps = (dispatch, props) =>
({
    setDataType(concept, featureSNData, featureSCData) {
        dispatch(resetState());
          dispatch(setDataTypeAndRedirect(concept, featureSNData, featureSCData, props));
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SamplesByDataTypeTable))
