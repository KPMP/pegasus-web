import {connect} from "react-redux";
import ParticipantSummary from "./ParticipantSummary";
import { setTissueType } from '../../actions/TissueType/tissueTypeActions'

const mapStateToProps = (state, props) =>
    ({
        tissueType: state.tissueType
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setTissueType(tissueType) {
            dispatch(setTissueType(tissueType));
        },
    });

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantSummary)