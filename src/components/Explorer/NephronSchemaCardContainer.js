import { connect } from 'react-redux';
import NephronSchemaCard from './NephronSchemaCard';
import { setSelectedConceptAndRedirect } from '../../actions/Concepts/conceptActions'
import { withRouter } from 'react-router';
import { setTissueType } from '../../actions/TissueType/tissueTypeActions'

const mapStateToProps = (state, props) =>
({
    selectedConcept: state.selectedConcept,
});

const mapDispatchToProps = (dispatch, props) =>
({
    setSelectedConcept(concept) {
        dispatch(setTissueType('all'))
        dispatch(setSelectedConceptAndRedirect(concept, props));
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NephronSchemaCard))