import React, { Component } from 'react';
import WelcomeText from './WelcomeText';
import DataSelector from './DataSelector';
import NephronSchemaCardContainer from './NephronSchemaCardContainer';
import { setSelectedConcept } from '../../actions/Concepts/conceptActions'

import { selectedConcept } from '../../initialState'
import { connect } from "react-redux";

class Explorer extends Component {


    render() {
        this.props.setSelectedConcept(selectedConcept);
        return (
            <article>
                <WelcomeText />
                <DataSelector />
                <NephronSchemaCardContainer />
            </article>
        );
    }
}

const mapDispatchToProps = (dispatch, props) =>
({
    setSelectedConcept(concept) {
        dispatch(setSelectedConcept(concept))
    }
});

export default connect(null, mapDispatchToProps)(Explorer)