import { connect } from 'react-redux';
import SamplesByDataTypeTable from './SamplesByDataTypeTable';
import { setDataTypeAndRedirect } from '../../actions/DataType/dataTypeActions'
import { withRouter } from 'react-router';
import { setDataType } from '../../actions/DataType/dataTypeActions';

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SamplesByDataTypeTable))