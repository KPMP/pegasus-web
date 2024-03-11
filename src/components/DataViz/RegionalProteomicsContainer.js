import {connect} from "react-redux";
import RegionalProteomics from "./RegionalProteomics";
import { setTissueType } from '../../actions/TissueType/tissueTypeActions'
import { setDataType } from "../../actions/DataType/dataTypeActions";
import { resetState } from "../../actions/resetAction";
import { setAccession } from "../../actions/Accession/accessionActions";

const mapStateToProps = (state, props) =>
    ({
        conceptSummary: state.conceptSummary,
        gene: state.gene,
        dataType: state.dataType,
        tissueType: state.tissueType,
        accession: state.accession
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setTissueType(tissueType) {
            dispatch(setTissueType(tissueType));
        },
        setDataType(dataType) {
            dispatch(setDataType(dataType));
        },
        resetState() {
            dispatch(resetState());
        }
    });

export default connect(mapStateToProps, mapDispatchToProps)(RegionalProteomics)
