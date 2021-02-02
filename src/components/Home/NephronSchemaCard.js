import React, { Component } from 'react';
import { Card, CardBody, CardText, Col, Row } from 'reactstrap';
import GeneSelect from './GeneSelect';

class NephronSchemaCard extends Component {
    render() {
        return (
            <Card>
                <CardBody>
                    <CardText>
                        <Row><Col className='search-box'>Search <GeneSelect/></Col></Row>
                        <Row>
                            <Col md='3'>
                                GLOMERULAR
                                <ul className='cell-type-list'>
                                    <li>Mesangial cell</li>
                                    <li>Podocyte</li>
                                </ul>
                                IMMUNE
                                <ul className='cell-type-list'>
                                    <li>Macrophage</li>
                                    <li>Monocyte</li>
                                    <li>T cells</li>
                                </ul>                    
                                VASCULAR
                                <ul className='cell-type-list'>
                                    <li>Vascular smooth muscle cells / pericytes</li>
                                </ul>
                            </Col>
                            <Col md='9'><img alt='nephron schema' src='/explorer/img/nephron-schema.png' className='nephron-schema'></img></Col>
                        </Row>
                    </CardText>
                </CardBody>
            </Card>
        );
    }
}

export default NephronSchemaCard;