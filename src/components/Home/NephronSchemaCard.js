import React, { Component } from 'react';
import {Col, Container, Row} from 'reactstrap';
import ConceptSelectContainer from './ConceptSelectContainer';
import { fetchCellTypeHierarchy } from "../../helpers/ApolloClient"

class NephronSchemaCard extends Component {

    getCellTypeHierarchy = async() => {
        const results = await fetchCellTypeHierarchy();
        console.log(results);
    }

    render() {

        this.getCellTypeHierarchy();

        return (
            <Container className="mt-3 rounded border p-3">
                <Row className="mb-4"><Col><ConceptSelectContainer/></Col></Row>
                <Row>
                    <Col md='3'>
                        <h5 className="mb-4">- OR -</h5>
                        <h5 className="mb-3">Select a cell type</h5>
                        <strong>GLOMERULAR</strong>
                        <ul className='cell-type-list'>
                            <li>Mesangial cell</li>
                            <li>Podocyte</li>
                        </ul>
                        <strong>IMMUNE</strong>
                        <ul className='cell-type-list'>
                            <li>Macrophage</li>
                            <li>Monocyte</li>
                            <li>T cells</li>
                        </ul>
                        <strong>VASCULAR</strong>
                        <ul className='cell-type-list'>
                            <li>Vascular smooth muscle cells / pericytes</li>
                        </ul>
                    </Col>
                    <Col md='9'><img alt='nephron schema' src='/explorer/img/nephron-schema.png' className='nephron-schema img-fluid'></img></Col>
                </Row>
            </Container>
        );
    }
}

export default NephronSchemaCard;