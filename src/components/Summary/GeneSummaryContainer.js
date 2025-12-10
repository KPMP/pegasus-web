import { connect } from 'react-redux';
import GeneSummary from './GeneSummary';
import { setDataTypeAndRedirect } from '../../actions/DataType/dataTypeActions'
import { setEnrollmentCategory } from "../../actions/EnrollmentCategory/enrollmentCategoryActions";
import { withRouter } from 'react-router';

const mapStateToProps = (state, props) =>
    ({
        gene: state.gene,
        conceptSummary: state.conceptSummary,
        featureSCData: state.featureSCData
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setDataType(dataType, featureSCData) {
            dispatch(setEnrollmentCategory("all"));
            dispatch(setDataTypeAndRedirect(dataType, featureSCData, props));
        }

    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GeneSummary))
