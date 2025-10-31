import { connect } from "react-redux";
import UMAPVizV2 from "./UMAPVizV2";

const mapStateToProps = (state, props) =>
({
    conceptSummary: state.conceptSummary,
    gene: state.gene,
    dataType: state.dataType,
    enrollmentCategory: state.enrollmentCategory
});

const mapDispatchToProps = (dispatch, props) =>
({

});

export default connect(mapStateToProps, mapDispatchToProps)(UMAPVizV2);