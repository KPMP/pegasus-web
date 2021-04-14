import { connect } from 'react-redux';
import CellTypeSummary from './CellTypeSummary';
import {setDataType} from "../../actions/DataType/dataTypeActions";
import {setTissueType} from "../../actions/TissueType/tissueTypeActions";
import { setCluster } from "../../actions/Cluster/clusterActions"
import { withRouter } from 'react-router';

const mapStateToProps = (state, props) =>
    ({
        cellType: state.cellType,
        conceptSummary: state.conceptSummary
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setDataTypeAndCluster(dataType, cluster) {
            dispatch(setDataType(dataType));
            dispatch(setTissueType("all"));
            dispatch(setCluster(cluster));
            dispatch(props.history.push("/diffex"));
        }
    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CellTypeSummary))