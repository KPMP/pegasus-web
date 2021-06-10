import {connect} from "react-redux";
import RegionalViz from "./RegionalViz";
import { setTissueType } from '../../actions/TissueType/tissueTypeActions'

const mapStateToProps = (state, props) =>
    ({
        conceptSummary: state.conceptSummary,
        gene: state.gene,
        dataType: state.dataType,
        tissueType: state.tissueType
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setTissueType(tissueType) {
            dispatch(setTissueType(tissueType));
        }
    });

export default connect(mapStateToProps, mapDispatchToProps)(RegionalViz)