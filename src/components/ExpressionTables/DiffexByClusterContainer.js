import { connect } from "react-redux";
import DiffexByCluster from "./DiffexByCluster";
import { withRouter } from 'react-router';
import { setGene } from "../../actions/Gene/geneActions";
import { setDataType } from "../../actions/DataType/dataTypeActions";

const mapStateToProps = (state, props) =>
({
    dataType: state.dataType,
    cluster: state.cluster,
    tissueType: state.tissueType
});

const mapDispatchToProps = (dispatch, props) =>
    ({
        setGene(gene, dataType) {
            dispatch(setGene(gene));
            if (dataType === 'rt') {
                dispatch((dispatch) => props.history.push("/explorer/regionalviz"));
            } else {
                dispatch((dispatch) => props.history.push("/explorer/dataviz"));
            }
        },
        setDataType(dataType) {
            dispatch(setDataType(dataType));
        }
    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DiffexByCluster))