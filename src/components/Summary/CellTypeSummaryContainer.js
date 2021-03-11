import { connect } from 'react-redux';
import CellTypeSummary from './CellTypeSummary';

const mapStateToProps = (state, props) =>
    ({
        selectedConcept: state.selectedConcept,
        conceptSummary: state.conceptSummary
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
    });

export default connect(mapStateToProps, mapDispatchToProps)(CellTypeSummary)