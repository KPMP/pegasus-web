import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';
import ConceptSelectFullWidth from '../ConceptSelect/ConceptSelectFullWidth';

class Search extends Component {
    render() {
        return (
            <Container className="multi-container-container">
                <Row>
                    <Col lg='12'>
                        <Container className="mt-3 rounded border p-3 shadow-sm">
                            <Row className="mb-4">
                                <Col>
                                    <ConceptSelectFullWidth useRedirection={true} redirect="/summary" featureNewCellClusterDate={this.props.featureNewCellClusterDate} />
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row >
            </Container>
        );
    }
}

export default Search;
