import { connect } from 'react-redux';
import AvailableDatasetsTable from './AvailableDatasetsTable';
import { setDataTypeAndRedirect } from '../../actions/DataType/dataTypeActions'
import { withRouter } from 'react-router';

const mapStateToProps = (state, props) =>
({
    omicsType: state.omicsType,
    hrtCount: state.hrtCount,
    dmrCount: state.dmrCount,
    akiCount: state.akiCount,
    ckdCount: state.ckdCount,
    linkType: state.linkType,
    linkValue: state.linkValue, 
    featureSTData: state.featureSTData
});

const mapDispatchToProps = (dispatch, props) =>
({
    setDataType(concept, featureSTData) {
        dispatch(setDataTypeAndRedirect(concept, featureSTData, props));
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AvailableDatasetsTable))