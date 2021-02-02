import React, { Component } from 'react';
import WelcomeText from './WelcomeText';
import NephronSchemaCard from './NephronSchemaCard';

class Home extends Component {
    render() {
        return (
            <article>
                <WelcomeText/>
                <NephronSchemaCard/>
            </article>
        );
    }
}

export default Home;