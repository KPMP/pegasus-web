import {connect} from "react-redux";
import RegionalViz from "./RegionalViz";
import { setTissueType } from '../../actions/TissueType/tissueTypeActions'
import { setDataType } from "../../actions/DataType/dataTypeActions";
import { resetState } from "../../actions/resetAction";

const mapStateToProps = (state, props) =>
    ({
        conceptSummary: state.conceptSummary,
        gene: state.gene,
        dataType: state.dataType,
        tissueType: state.tissueType
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setTissueType(tissueType) {
            dispatch(setTissueType(tissueType));
        },
        setDataType(dataType) {
            dispatch(setDataType(dataType));
        },
        resetState() {
            dispatch(resetState());
        }
    });

export default connect(mapStateToProps, mapDispatchToProps)(RegionalViz)