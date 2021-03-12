import { connect } from 'react-redux';
import NephronSchemaCard from './NephronSchemaCard';
import { setSelectedConcept } from '../../actions/Concepts/conceptActions'

const mapStateToProps = (state, props) =>
    ({
        selectedConcept: state.selectedConcept,
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setSelectedConcept(concept) {
            dispatch(setSelectedConcept(concept));
            props.history.push("/celltypesummary");
        }
    });

export default connect(mapStateToProps, mapDispatchToProps)(NephronSchemaCard)