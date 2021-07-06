import { connect } from 'react-redux';
import DataSelector from './DataSelector';
import { setDataTypeAndRedirect } from '../../actions/DataType/dataTypeActions'
import { withRouter } from 'react-router';

const mapStateToProps = (state, props) =>
({
});

const mapDispatchToProps = (dispatch, props) =>
({
    setSelectedConcept(dataType) {
        dispatch(setDataTypeAndRedirect(dataType, props));
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DataSelector))