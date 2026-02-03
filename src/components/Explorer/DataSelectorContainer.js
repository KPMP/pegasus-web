import { connect } from 'react-redux';
import DataSelector from './DataSelector';
import { setDataTypeAndRedirect } from '../../actions/DataType/dataTypeActions'
import { withRouter } from 'react-router';

const mapStateToProps = (state, props) =>
({
    featureSTData: state.featureSTData
});

const mapDispatchToProps = (dispatch, props) =>
({
    setSelectedConcept(dataType, featureSTData){
        dispatch(setDataTypeAndRedirect(dataType, featureSTData, props));
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DataSelector))
