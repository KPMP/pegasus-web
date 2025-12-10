import { connect } from 'react-redux';
import CellTypeSummary from './CellTypeSummary';
import { setDataType } from "../../actions/DataType/dataTypeActions";
import { setEnrollmentCategory } from "../../actions/EnrollmentCategory/enrollmentCategoryActions";
import { setCluster } from "../../actions/Cluster/clusterActions"
import { withRouter } from 'react-router';

const mapStateToProps = (state, props) =>
({
    cellType: state.cellType,
    conceptSummary: state.conceptSummary,
    featureSCData: state.featureSCData,
});

const mapDispatchToProps = (dispatch, props) =>

    ({
        setDataTypeAndCluster(dataType, cluster, featureSCData) {
            dispatch(setDataType(dataType));
            dispatch(setEnrollmentCategory("all"));
            dispatch(setCluster(cluster));
            dispatch((dispatch) => window.open("/explorer/diffex2", '_self'));
            
        }
    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CellTypeSummary))