import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';

class WelcomeText extends Component {
    render() {
        return (
            <Container className="mt-3 rounded border p-3 shadow-sm">
                <Row><Col><h5>Welcome to the Kidney Tissue Atlas Explorer</h5></Col></Row>
                <Row><Col><p>Search by marker gene, cell type, or data type to view summary data visualizations across the various KPMP 'omics' technologies.</p></Col></Row>
            </Container>
        );
    }
}

export default WelcomeText;
