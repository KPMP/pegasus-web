import React, { Component } from 'react';
import WelcomeText from './WelcomeText';
import DataSelectorContainer from './DataSelectorContainer';
import NephronSchemaCardContainer from './NephronSchemaCardContainer';
import { setSelectedConcept } from '../../actions/Concepts/conceptActions'
import { setGene } from '../../actions/Gene/geneActions'

import { selectedConcept } from '../../initialState'
import { connect } from "react-redux";

class Explorer extends Component {
    render() {
        this.props.setGene("");
        this.props.setSelectedConcept(selectedConcept);
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
    setSelectedConcept(concept) {
        dispatch(setSelectedConcept(concept))
    }
});

export default connect(null, mapDispatchToProps)(Explorer)