import { connect } from 'react-redux';
import DataSelector from './DataSelector';
import { setDataTypeAndRedirect } from '../../actions/DataType/dataTypeActions'
import { withRouter } from 'react-router';
import { featureNewCellClusterData } from '../DataViz/featureSwitchReducer';

const mapStateToProps = (state, props) =>
({
  featureSNData: state.featureSNData,
  featureSCData: state.featureSCData,
  featureNewCellClusterData: state.featureNewCellClusterData
});

const mapDispatchToProps = (dispatch, props) =>
({
    setSelectedConcept(dataType, featureSNData, featureSCData) {
        dispatch(setDataTypeAndRedirect(dataType, featureSNData, featureSCData, props));
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DataSelector))
