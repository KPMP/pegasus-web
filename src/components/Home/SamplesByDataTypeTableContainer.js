import { connect } from 'react-redux';
import SamplesByDataTypeTable from './SamplesByDataTypeTable';
import { setDataTypeAndRedirect, setDataType } from '../../actions/DataType/dataTypeActions'
import { withRouter } from 'react-router';

const mapStateToProps = (state, props) =>
({
    selectedDataType: state.selectedDataType,
});

// const mapDispatchToProps = (dispatch, props) =>
// ({
    
// });

export default withRouter(connect(mapStateToProps)(SamplesByDataTypeTable))