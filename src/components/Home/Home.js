import React, { Component } from 'react';
import WelcomeText from './WelcomeText';
import NephronSchemaCard from './NephronSchemaCard';
import { setSelectedConcept } from '../../actions/Concepts/conceptActions'
import { selectedConcept } from '../../initialState'
import { connect } from "react-redux";

class Home extends Component {


    render() {
        this.props.setSelectedConcept(selectedConcept);
        return (
            <article>
                <WelcomeText/>
                <NephronSchemaCard/>
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