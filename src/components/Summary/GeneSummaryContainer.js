import { connect } from 'react-redux';
import GeneSummary from './GeneSummary';
import { setDataTypeAndRedirect } from '../../actions/DataType/dataTypeActions'
import { setEnrollmentCategory } from "../../actions/EnrollmentCategory/enrollmentCategoryActions";
import { withRouter } from 'react-router';
import { setFeatureSTData } from '../../actions/FeatureSwtich/featureSwitchActions';

const mapStateToProps = (state, props) =>
    ({
        gene: state.gene,
        conceptSummary: state.conceptSummary,
        featureSTData: state.featureSTData,
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setDataType(dataType, featureSTData) {
            dispatch(setEnrollmentCategory("all"));
            dispatch(setDataTypeAndRedirect(dataType, featureSTData, props));
        },
        setFeatureSTData(featureSTData){
            dispatch(setFeatureSTData(featureSTData))
        }

    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GeneSummary))
