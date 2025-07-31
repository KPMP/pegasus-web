import { connect } from "react-redux";
import RNASeqVizV2 from "./RNASeqVizV2";
import { setEnrollmentCategory } from "../../actions/EnrollmentCategory/enrollmentCategoryActions";
import { setFeatureSNData, setFeatureSCData } from "../../actions/FeatureSwitch/featureSwitchActions";
import { setDataType } from "../../actions/DataType/dataTypeActions";
import { resetState } from "../../actions/resetAction";

const mapStateToProps = (state, props) => ({
  conceptSummary: state.conceptSummary,
  gene: state.gene,
  dataType: state.dataType,
  enrollmentCategory: state.enrollmentCategory,
  featureSNData: state.featureSNData,
  featureSCData: state.featureSCData
});

const mapDispatchToProps = (dispatch, props) => ({
  setDataType(dataType) {
    dispatch(setDataType(dataType));
  },
  setFeatureSNData(featureSNData) {
    dispatch(setFeatureSNData(featureSNData))
  },
  setFeatureSCData(featureSCData) {
    dispatch(setFeatureSCData(featureSCData))
  },
  setEnrollmentCategory(enrollmentCategory) {
    dispatch(setEnrollmentCategory(enrollmentCategory));
  },
  resetState() {
    dispatch(resetState());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RNASeqVizV2);
