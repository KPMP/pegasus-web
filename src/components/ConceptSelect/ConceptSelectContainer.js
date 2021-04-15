import { connect } from 'react-redux';
import ConceptSelect from './ConceptSelect';
import { setSelectedConceptAndRedirect } from '../../actions/Concepts/conceptActions'
import { withRouter } from 'react-router';

const mapStateToProps = (state, props) =>
{
    let selectedConcept = props.selectedConcept?props.selectedConcept:state.selectedConcept;
    return {
        selectedConcept: selectedConcept,
        gene: state.gene
    }
};

const mapDispatchToProps = (dispatch, props) =>
    ({
        setSelectedConcept(concept) {
            dispatch(setSelectedConceptAndRedirect(concept, props));
        }
    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConceptSelect))