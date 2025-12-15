import { connect } from "react-redux";
import STViz from "./STViz";
import { setEnrollmentCategory } from "../../actions/EnrollmentCategory/enrollmentCategoryActions";
import { setDataType } from "../../actions/DataType/dataTypeActions";
import { resetState } from "../../actions/resetAction";

const mapStateToProps = (state, props) => ({
});

const mapDispatchToProps = (dispatch, props) => ({
  setDataType(dataType) {
    dispatch(setDataType(dataType));
  },
  setEnrollmentCategory(enrollmentCategory) {
    dispatch(setEnrollmentCategory(enrollmentCategory));
  },
  resetState() {
    dispatch(resetState());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(STViz);
