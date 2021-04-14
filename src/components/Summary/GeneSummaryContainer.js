import { connect } from 'react-redux';
import GeneSummary from './GeneSummary';
import { setDataType } from '../../actions/DataType/dataTypeActions'
import { setTissueType } from "../../actions/TissueType/tissueTypeActions";
import { withRouter } from 'react-router';

const mapStateToProps = (state, props) =>
    ({
        gene: state.gene,
        conceptSummary: state.conceptSummary
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setDataType(dataType) {
            dispatch(setDataType(dataType));
            dispatch(setTissueType("all"));
            dispatch(props.history.push("/dataViz"));
        }

    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GeneSummary))