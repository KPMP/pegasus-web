import { connect } from 'react-redux';
import ConceptSelect from './ConceptSelect';
import { setSelectedConcept, setSelectedConceptAndRedirect } from '../../actions/Concepts/conceptActions'
import { withRouter } from 'react-router';
import { setDataTypeAndRedirect } from "../../actions/DataType/dataTypeActions";

const mapStateToProps = (state, props) => {
    let selectedConcept = props.selectedConcept ? props.selectedConcept : state.selectedConcept;
    return {
        selectedConcept: selectedConcept,
        gene: state.gene,
    }
};

const mapDispatchToProps = (dispatch, props) =>
({
    setDataType(dataType, featureSTData) {
        dispatch(setDataTypeAndRedirect(dataType, featureSTData, props));
    },
    setSelectedConcept(concept) {
        const action = props.useRedirection
            ? setSelectedConceptAndRedirect(concept, props)
            : setSelectedConcept(concept)
        dispatch(action);
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConceptSelect))
