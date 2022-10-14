import { connect } from 'react-redux';
import SamplesByDataTypeTable from './SamplesByDataTypeTable';
import { setSelectedConceptAndRedirect } from '../../actions/DataType/dataTypeActions'
import { withRouter } from 'react-router';
import { setDataType } from '../../actions/DataType/dataTypeActions';

const mapStateToProps = (state, props) =>
({
    selectedConcept: state.selectedConcept,
});

const mapDispatchToProps = (dispatch, props) =>
({
    setSelectedConcept(concept) {
        dispatch(setDataType('all'))
        dispatch(setSelectedConceptAndRedirect(concept, props));
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SamplesByDataTypeTable))