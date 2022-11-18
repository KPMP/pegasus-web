import { connect } from 'react-redux';
import AvailableDatasetsTable from './AvailableDatasetsTable';
import { setDataTypeAndRedirect } from '../../actions/DataType/dataTypeActions'
import { withRouter } from 'react-router';

const mapStateToProps = (state, props) =>
({
    selectedDataType: state.selectedDataType,
});

const mapDispatchToProps = (dispatch, props) =>
({
    setDataType(concept) {
        dispatch(setDataTypeAndRedirect(concept, props));
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AvailableDatasetsTable))