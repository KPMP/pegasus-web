import { connect } from "react-redux";
import RNASeqViz from "./RNASeqViz";
import { setTissueType } from '../../actions/TissueType/tissueTypeActions'
import { setDataType } from "../../actions/DataType/dataTypeActions";

const mapStateToProps = (state, props) =>
({
    conceptSummary: state.conceptSummary,
    gene: state.gene,
    dataType: state.dataType,
    tissueType: state.tissueType
});

const mapDispatchToProps = (dispatch, props) =>
({
    setDataType(dataType) {
        dispatch(setDataType(dataType));
    },
    setTissueType(tissueType) {
        dispatch(setTissueType(tissueType));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RNASeqViz)