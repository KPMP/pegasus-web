import { connect } from 'react-redux';
import DataTypeSelector from './DataTypeSelector';
import { setSelectedConcept } from '../../actions/Concepts/conceptActions'
import { withRouter } from 'react-router';

const mapStateToProps = (state, props) =>
    ({
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DataTypeSelector))