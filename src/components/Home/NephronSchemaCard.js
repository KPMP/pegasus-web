import React, { Component } from 'react';
import {Col, Container, Row, Spinner } from 'reactstrap';
import ConceptSelectFullWidth from '../ConceptSelect/ConceptSelectFullWidth';
import { fetchCellTypeHierarchy } from "../../helpers/ApolloClient";

class NephronSchemaCard extends Component {

    constructor(props) {
        super(props);
        let hierarchy = this.getCellTypeHierarchy();
        this.state = {
            cellTypeHierarchy: hierarchy,
            isProcessing: true
        }
    }

    getCellTypeHierarchy = async() => {
        const results = await fetchCellTypeHierarchy();
        this.setState({cellTypeHierarchy: results, isProcessing: false});
    };

    handleCellTypeClick = (cellType) => {
        this.props.setSelectedConcept({type: "cell_type", value: cellType});
    };

    generateHierarchyText = () => {
        if (this.state.isProcessing) {
            return (
               <Spinner color='primary'/> 
            )
        } else {
            let hierarchy = this.state.cellTypeHierarchy;
            let regions = hierarchy.cellTypeRegions;
            return regions.map((region) => {
                let regions = [];
                let subregions = region.cellTypeSubregions;
                let subregionText = subregions.map((subregion) => {
                    let cellTypes = subregion.cellTypeNames.map((cellTypeName) => {
                        return <li>
                            <button onClick={() => this.handleCellTypeClick(cellTypeName)} type="button" className="btn btn-link text-left p-0">{cellTypeName}</button>
                        </li>
                    });
                    return (
                        <section><li>{subregion.subregionName}</li>
                            <ul className='cell-type-list'>
                                {cellTypes}
                            </ul>
                        </section>
                    );
                        
                });
                regions.push(
                    <section>
                        <strong>{region.regionName}</strong>
                        <ul className='cell-type-list'>
                            {subregionText}
                        </ul>
                    </section>)
                return <div>{regions}</div>;
            });
        }

    };

    render() {
        let hierarchyText = this.generateHierarchyText();
        return (
            <Container className="mt-3 rounded border p-3 shadow-sm">
                <Row className="mb-4"><Col><ConceptSelectFullWidth redirect="/summary" /></Col></Row>
                <Row>
                    <Col md='3'>
                        <h5 className="mb-4">- OR -</h5>
                        <h5 className="mb-3">Select a cell type</h5>
                        {hierarchyText}
                    </Col>
                    <Col md='9'><img alt='nephron schema' src='/explorer/img/nephron-schema.png' className='nephron-schema img-fluid'></img></Col>
                </Row>
            </Container>
        );
    }
}

export default NephronSchemaCard;