import { connect } from 'react-redux';
import SamplesByDataTypeTable from './SamplesByDataTypeTable';
import { setDataTypeAndRedirect } from '../../actions/DataType/dataTypeActions'
import { withRouter } from 'react-router';
import { resetState } from "../../actions/resetAction";
import { setFeatureSTData } from '../../actions/FeatureSwitch/featureSwitchActions';

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
    },
    setFeatureSTData(featureSTData){
        dispatch(setFeatureSTData(featureSTData))
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SamplesByDataTypeTable))
