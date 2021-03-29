import {connect} from "react-redux";
import DiffexByCellType from "./DiffexByCellType";
import { withRouter } from 'react-router';
import {setSelectedConcept} from "../../actions/Concepts/conceptActions";

const mapStateToProps = (state, props) =>
    ({
        selectedConcept: state.selectedConcept,
        dataType: state.dataType,
        tissueType: state.tissueType
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setSelectedConcept(concept) {
            dispatch(setSelectedConcept(concept));
            dispatch(props.history.push("/dataviz"));
        }
    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DiffexByCellType))