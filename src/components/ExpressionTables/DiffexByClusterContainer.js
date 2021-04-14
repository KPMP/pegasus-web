import {connect} from "react-redux";
import DiffexByCluster from "./DiffexByCluster";
import { withRouter } from 'react-router';
import { setGene } from "../../actions/Gene/geneActions";

const mapStateToProps = (state, props) =>
    ({
        dataType: state.dataType,
        cluster: state.cluster,
        tissueType: state.tissueType
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setGene(gene) {
            dispatch(setGene(gene));
            dispatch(props.history.push("/dataviz"));
        }
    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DiffexByCluster))