import React, { Component } from 'react';
import WelcomeText from './WelcomeText';
import NephronSchemaCardContainer from './NephronSchemaCardContainer';
import { setSelectedConcept } from '../../actions/Concepts/conceptActions'
import { selectedConcept } from '../../initialState'
import { connect } from "react-redux";

class Home extends Component {


    render() {
        this.props.setSelectedConcept(selectedConcept);
        return (
            <article>
                <WelcomeText/>
                <NephronSchemaCardContainer/>
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

export default connect(null, mapDispatchToProps)(Home)