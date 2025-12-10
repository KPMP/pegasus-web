import { connect } from 'react-redux';
import DataTypeSelector from './DataTypeSelector';
import { withRouter } from 'react-router';
import { setEnrollmentCategory } from '../../actions/EnrollmentCategory/enrollmentCategoryActions'
import { setDataType } from "../../actions/DataType/dataTypeActions";

const mapStateToProps = (state, props) =>
({
    enrollmentCategory: state.enrollmentCategory,
    dataType: state.dataType,
    gene: state.gene,
    isLoadingUmap: props.isLoadingUmap,
    featureSCData: state.featureSCData
});

const mapDispatchToProps = (dispatch, props) =>
({
    setEnrollmentCategory(enrollmentCategory) {
        dispatch(setEnrollmentCategory(enrollmentCategory));
    },
    setDataType(dataType, featureSCData) {
        dispatch(setDataType(dataType));
        if (dataType === 'rt') {
            dispatch((dispatch) => window.open("/explorer/regionalviz", "_self"));
        } else if (dataType === 'sc') {
            if (featureSCData) {
              dispatch((dispatch) => window.open("/explorer/dataViz2", "_self"));
            }else{
              dispatch((dispatch) => window.open("/explorer/dataViz", "_self"));
            }
        }
        else if (dataType === 'sn') {
          dispatch((dispatch) => window.open("/explorer/dataViz2", "_self"));
        }
        else if(dataType === "rp"){
          dispatch((dispatch) => window.open("/explorer/regionalpro", "_self"));
        }
    }

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DataTypeSelector))
