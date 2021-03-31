import { connect } from 'react-redux';
import DataTypeSelector from './DataTypeSelector';
import { withRouter } from 'react-router';
import {setTissueType} from '../../actions/TissueType/tissueTypeActions'

const mapStateToProps = (state, props) =>
    ({
        tissueType: state.tissueType
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setTissueType(tissueType) {
            dispatch(setTissueType(tissueType));
        }

    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DataTypeSelector))