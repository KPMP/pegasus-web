import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';
import ConceptSelectFullWidth from '../ConceptSelect/ConceptSelectFullWidth';
import SamplesByDataTypeTable from './SamplesByDataTypeTable';

class WelcomeText extends Component {
    render() {
        return (
            <Container className="multi-container-container">
                <Row>
                    <Col lg='4'>
                        <Container className="mt-3 rounded border p-3 shadow-sm expanded-search-container">
                            <Row className="mb-4">
                                <Col>
                                    <ConceptSelectFullWidth useRedirection={true} redirect="/summary" featureNewCellClusterDate={this.props.featureNewCellClusterDate} />
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col lg='8'>
                        <Container className="mt-3 rounded border p-3 shadow-sm">
                            <Row className="mb-4">
                                <Col>
                      <SamplesByDataTypeTable history={this.props.history} setSelectedConcept={this.props.setSelectedConcept} featureSCData={this.props.featureSCData} />
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row >
            </Container>
        );
    }
}

export default WelcomeText;
