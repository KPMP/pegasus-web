import { connect } from 'react-redux';
import CellTypeSummary from './CellTypeSummary';
import {setDataType} from "../../actions/DataType/dataTypeActions";
import {setTissueType} from "../../actions/TissueType/tissueTypeActions";
import { setSelectedConcept } from "../../actions/Concepts/conceptActions"
import { withRouter } from 'react-router';

const mapStateToProps = (state, props) =>
    ({
        selectedConcept: state.selectedConcept,
        conceptSummary: state.conceptSummary
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setDataTypeAndCluster(dataType, cluster) {
            let selectedConcept = {
                value: cluster,
                type: 'cell_type'
            };
            dispatch(setDataType(dataType));
            dispatch(setTissueType("all"));
            dispatch(setSelectedConcept(selectedConcept));
            dispatch(props.history.push("/diffex"));
        }
    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CellTypeSummary))