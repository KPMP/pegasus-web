import { connect } from 'react-redux';
import NephronSchemaCard from './NephronSchemaCard';
import { setSelectedConceptAndRedirect } from '../../actions/Concepts/conceptActions'
import { withRouter } from 'react-router';
import { setEnrollmentCategory } from '../../actions/EnrollmentCategory/enrollmentCategoryActions'
import { setActiveTab } from '../../actions/ActiveTab/activeTabActions'

const mapStateToProps = (state, props) =>
({
    selectedConcept: state.selectedConcept,
    activeTab: state.activeTab,
});

const mapDispatchToProps = (dispatch, props) =>
({
    setSelectedConcept(concept) {
        dispatch(setEnrollmentCategory('all'))
        dispatch(setSelectedConceptAndRedirect(concept, props));
    },
    setActiveTab(tab) {
        dispatch(setActiveTab(tab));
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NephronSchemaCard))