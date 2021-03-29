import { connect } from 'react-redux';
import CellTypeSummary from './CellTypeSummary';
import {setDataType} from "../../actions/DataType/dataTypeActions";
import {setTissueType} from "../../actions/TissueType/tissueTypeActions";
import { withRouter } from 'react-router';

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
            dispatch(props.history.push("/diffex"));
        }
    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CellTypeSummary))