import React, { Component } from 'react';
import WelcomeText from './WelcomeText';
import DataSelectorContainer from './DataSelectorContainer';
import NephronSchemaCardContainer from './NephronSchemaCardContainer';
import { setSelectedConcept } from '../../actions/Concepts/conceptActions';
import { setGene } from '../../actions/Gene/geneActions';
import { setTissueType } from '../../actions/TissueType/tissueTypeActions';
import { setDataType } from '../../actions/DataType/dataTypeActions';
import { setAccession } from '../../actions/Accession/accessionActions';

import initialState from '../../initialState';
import { connect } from "react-redux";

class Explorer extends Component {
    render() {
        this.props.setAccession(initialState.accession)
        this.props.setGene("");
        this.props.setTissueType("");
        this.props.setDataType("");
        this.props.setSelectedConcept(initialState.selectedConcept);
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
    setTissueType(tissueType) {
        dispatch(setTissueType(tissueType));
    },
    setDataType(dataType) {
        dispatch(setDataType(dataType));
    },
    setSelectedConcept(concept) {
        dispatch(setSelectedConcept(concept))
    },
    setAccession(accession){
      dispatch(setAccession(accession))
    }
});

export default connect(null, mapDispatchToProps)(Explorer)
