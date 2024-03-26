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
    linkValue: state.linkValue
});

const mapDispatchToProps = (dispatch, props) =>
({
    setDataType(concept) {
        dispatch(setDataTypeAndRedirect(concept, props));
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AvailableDatasetsTable))