import { connect } from 'react-redux';
import ConceptSelect from './ConceptSelect';
import { setSelectedConcept } from '../../actions/Concepts/conceptActions'
import { withRouter } from 'react-router';

const mapStateToProps = (state, props) =>
    ({
        selectedConcept: state.selectedConcept
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setSelectedConcept(concept) {
            dispatch(setSelectedConcept(concept));
            props.history.push("/summary");
        }
    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConceptSelect))