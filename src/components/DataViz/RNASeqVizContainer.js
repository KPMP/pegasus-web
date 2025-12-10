import { connect } from "react-redux";
import RNASeqViz from "./RNASeqViz";
import { setEnrollmentCategory } from "../../actions/EnrollmentCategory/enrollmentCategoryActions";
import { setDataType } from "../../actions/DataType/dataTypeActions";
import { resetState } from "../../actions/resetAction";

const mapStateToProps = (state, props) => ({
  conceptSummary: state.conceptSummary,
  gene: state.gene,
  dataType: state.dataType,
  enrollmentCategory: state.enrollmentCategory
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

export default connect(mapStateToProps, mapDispatchToProps)(RNASeqViz);
