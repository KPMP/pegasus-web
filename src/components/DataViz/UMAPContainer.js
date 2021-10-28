import { connect } from "react-redux";
import UMAP from "./UMAPViz";

const mapStateToProps = (state, props) =>
({
    conceptSummary: state.conceptSummary,
    gene: state.gene,
    dataType: state.dataType,
    tissueType: state.tissueType
});

const mapDispatchToProps = (dispatch, props) =>
({

});

export default connect(mapStateToProps, mapDispatchToProps)(UMAP);