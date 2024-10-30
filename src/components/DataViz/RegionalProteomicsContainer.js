import {connect} from "react-redux";
import RegionalProteomics from "./RegionalProteomics";
import { setEnrollmentCategory } from '../../actions/EnrollmentCategory/enrollmentCategoryActions'
import { setDataType } from "../../actions/DataType/dataTypeActions";
import { resetState } from "../../actions/resetAction";
import { setAccession } from "../../actions/Accession/accessionActions";

const mapStateToProps = (state, props) =>
    ({
        conceptSummary: state.conceptSummary,
        gene: state.gene,
        dataType: state.dataType,
        enrollmentCategory: state.enrollmentCategory,
        accession: state.accession
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setEnrollmentCategory(enrollmentCategory) {
            dispatch(setEnrollmentCategory(enrollmentCategory));
        },
        setDataType(dataType) {
            dispatch(setDataType(dataType));
        },
        setAccession(accession){
            dispatch(setAccession(accession));
        },
        resetState() {
            dispatch(resetState());
        }
    });

export default connect(mapStateToProps, mapDispatchToProps)(RegionalProteomics)
