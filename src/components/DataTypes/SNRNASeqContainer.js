import {connect} from "react-redux";
import SNRNASeq from "./SNRNASeq";

const mapStateToProps = (state, props) =>
    ({
        selectedConcept: state.selectedConcept,
        conceptSummary: state.conceptSummary
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
    });

export default connect(mapStateToProps, mapDispatchToProps)(SNRNASeq)