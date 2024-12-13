import {connect} from "react-redux";
import ParticipantSummary from "./ParticipantSummary";
import { setEnrollmentCategory } from '../../actions/EnrollmentCategory/enrollmentCategoryActions'

const mapStateToProps = (state, props) =>
    ({
        enrollmentCategory: state.enrollmentCategory
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setEnrollmentCategory(enrollmentCategory) {
            dispatch(setEnrollmentCategory(enrollmentCategory));
        },
    });

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantSummary)