import { connect } from 'react-redux';
import NephronSchemaCard from './NephronSchemaCard';
import { setSelectedConceptAndRedirect } from '../../actions/Concepts/conceptActions'
import { withRouter } from 'react-router';
import { setEnrollmentCategory } from '../../actions/EnrollmentCategory/enrollmentCategoryActions'

const mapStateToProps = (state, props) =>
({
    selectedConcept: state.selectedConcept,
    featureNewCellClusterData: state.featureNewCellClusterData
});

const mapDispatchToProps = (dispatch, props) =>
({
    setSelectedConcept(concept, featureNewCellClusterData) {
        console.log(featureNewCellClusterData)
        dispatch(setEnrollmentCategory('all'))
        dispatch(setSelectedConceptAndRedirect(concept, featureNewCellClusterData, props));
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NephronSchemaCard))