import {connect} from "react-redux";
import DiffexByCellType from "./DiffexByCellType";

const mapStateToProps = (state, props) =>
    ({
        selectedConcept: state.selectedConcept,
        dataType: state.dataType,
        tissueType: state.tissueType
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
    });

export default connect(mapStateToProps, mapDispatchToProps)(DiffexByCellType)