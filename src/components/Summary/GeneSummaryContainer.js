import { connect } from 'react-redux';
import GeneSummary from './GeneSummary';
import { setDataType } from '../../actions/DataType/dataTypeActions'
import { setTissueType } from "../../actions/TissueType/tissueTypeActions";

const mapStateToProps = (state, props) =>
    ({
        selectedConcept: state.selectedConcept,
        conceptSummary: state.conceptSummary
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setDataType(dataType) {
            dispatch(setDataType(dataType));
            dispatch(setTissueType("all"));
            dispatch(props.history.push("/dataViz"));
        }

    });

export default connect(mapStateToProps, mapDispatchToProps)(GeneSummary)