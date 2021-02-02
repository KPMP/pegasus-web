import { connect } from 'react-redux';
import ConceptSelect from './ConceptSelect';
import { setSelectedConcept } from '../actions/Concepts/conceptActions'

const mapStateToProps = (state, props) =>
    ({
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setSelectedConcept(concept) {
            dispatch(setSelectedConcept(concept))
            props.history.push("/summary");
        }
    });

export default connect(mapStateToProps, mapDispatchToProps)(ConceptSelect)