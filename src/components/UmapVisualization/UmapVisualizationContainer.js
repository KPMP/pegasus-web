import { connect } from 'react-redux';
import UmapVisualization from './UmapVisualization';

const mapStateToProps = (state, props) =>
    ({
        selectedConcept: state.selectedConcept,
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
    });

export default connect(mapStateToProps, mapDispatchToProps)(UmapVisualization);