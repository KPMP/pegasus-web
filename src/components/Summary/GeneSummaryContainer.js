import { connect } from 'react-redux';
import GeneSummary from './GeneSummary';
import { setDataTypeAndRedirect } from '../../actions/DataType/dataTypeActions'
import { setEnrollmentCategory } from "../../actions/EnrollmentCategory/enrollmentCategoryActions";
import { withRouter } from 'react-router';

const mapStateToProps = (state, props) =>
    ({
        gene: state.gene,
        conceptSummary: state.conceptSummary
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setDataType(dataType) {
            dispatch(setEnrollmentCategory("all"));
            dispatch(setDataTypeAndRedirect(dataType, props));
        }

    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GeneSummary))