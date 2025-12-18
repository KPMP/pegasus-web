import React, { Component } from 'react';
import WelcomeText from './WelcomeText';
import DataSelectorContainer from './DataSelectorContainer';
import NephronSchemaCardContainer from './NephronSchemaCardContainer';
import { setSelectedConcept } from '../../actions/Concepts/conceptActions';
import { setGene } from '../../actions/Gene/geneActions';
import { setEnrollmentCategory } from '../../actions/EnrollmentCategory/enrollmentCategoryActions';
import { setDataType } from '../../actions/DataType/dataTypeActions';
import { setAccession } from '../../actions/Accession/accessionActions';
import { setFeatureSTData } from '../../actions/FeatureSwtich/featureSwitchActions';

import initialState from '../../initialState';
import { connect } from "react-redux";

class Explorer extends Component {
    render() {
        this.props.setAccession(initialState.accession)
        this.props.setGene("");
        this.props.setEnrollmentCategory("");
        this.props.setDataType("");
        this.props.setSelectedConcept(initialState.selectedConcept);
        this.props.setFeatureSTData(initialState.featureSTData);
        return (
            <article>
                <WelcomeText />
                <DataSelectorContainer />
                <NephronSchemaCardContainer />
            </article>
        );
    }
}

const mapDispatchToProps = (dispatch, props) =>
({
    setGene(gene) {
        dispatch(setGene(gene));
    },
    setEnrollmentCategory(enrollmentCategory) {
        dispatch(setEnrollmentCategory(enrollmentCategory));
    },
    setDataType(dataType) {
        dispatch(setDataType(dataType));
    },
    setSelectedConcept(concept) {
        dispatch(setSelectedConcept(concept))
    },
    setAccession(accession){
      dispatch(setAccession(accession))
    },
    setFeatureSTData(featureSTData){
        dispatch(setFeatureSTData(featureSTData))
    }
});

export default connect(null, mapDispatchToProps)(Explorer)
