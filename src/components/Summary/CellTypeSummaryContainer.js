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
    featureSNData: state.featureSNData,
    featureSCData: state.featureSCData,
    featureNewCellClusterData: state.featureNewCellClusterData
});

const mapDispatchToProps = (dispatch, props) =>

    ({
        setDataTypeAndCluster(dataType, cluster) {
            dispatch(setDataType(dataType));
            dispatch(setEnrollmentCategory("all"));
            dispatch(setCluster(cluster));
            if ((dataType === 'sc' && props.featureSCData) || (dataType === 'sn' && props.featureSNData)) {
                  dispatch((dispatch) => window.open("/explorer/diffex2", '_self'));
            } else {
                dispatch((dispatch) => window.open("/explorer/diffex", '_self'));
            }

        }
    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CellTypeSummary))