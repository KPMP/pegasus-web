import React, { Component } from 'react';
import {Row, Col, Container} from 'reactstrap';

class WelcomeText extends Component {
    render() {
        return (
            <Container className="mt-3 rounded border p-3 shadow-sm">
                <Row><Col><p><h5>Welcome to the Kidney Tissue Atlas Explorer</h5></p></Col></Row>
                <Row><Col><p>Here you can search for markers or cell types of interest and view summary data visualizations across the various KPMP 'omics' technologies.</p></Col></Row>
                <Row><Col><p><a rel="noreferrer" target='_blank' href='https://www.kpmp.org/help-docs/data'>Learn more about our data types and methodologies</a></p></Col></Row>
            </Container>
        );
    }
}

export default WelcomeText;