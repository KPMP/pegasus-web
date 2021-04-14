import {connect} from "react-redux";
import DiffexByCluster from "./DiffexByCluster";
import { withRouter } from 'react-router';
import {setSelectedConcept} from "../../actions/Concepts/conceptActions";

const mapStateToProps = (state, props) =>
    ({
        dataType: state.dataType,
        cluster: state.cluster,
        tissueType: state.tissueType
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setSelectedConcept(concept) {
            dispatch(setSelectedConcept(concept));
            dispatch(props.history.push("/dataviz"));
        }
    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DiffexByCluster))