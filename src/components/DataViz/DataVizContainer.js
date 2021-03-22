import {connect} from "react-redux";
import DataViz from "./DataViz";

const mapStateToProps = (state, props) =>
    ({
        selectedConcept: state.selectedConcept,
        conceptSummary: state.conceptSummary,
        dataType: state.dataType,
        tissueType: state.tissueType
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
    });

export default connect(mapStateToProps, mapDispatchToProps)(DataViz)