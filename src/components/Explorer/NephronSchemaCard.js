import React, { Component } from 'react';
import { Col, Container, Row, Spinner } from 'reactstrap';
import { fetchCellTypeHierarchy } from "../../helpers/ApolloClient";
import CellTypeTabs from './CellTypeTabs';
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';

class NephronSchemaCard extends Component {

    constructor(props) {
        super(props);
        let hierarchy = this.getCellTypeHierarchy();
        this.state = {
            cellTypeHierarchy: hierarchy,
            isProcessing: true,
            activeTab: '1'
        }
    }

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab });
        }
    }

    getCellTypeHierarchy = async () => {
        const results = await fetchCellTypeHierarchy();
        this.setState({ cellTypeHierarchy: results, isProcessing: false });
    };

    handleCellTypeClick = (cellType) => {
        handleGoogleAnalyticsEvent('Search', 'cell_type', cellType);
        this.props.setSelectedConcept({ type: 'cell_type', value: cellType });
    };

    processHierarchyText = () => {
        if (!this.state.isProcessing) {
            let hierarchy = this.state.cellTypeHierarchy;
            let regions = hierarchy.cellTypeRegions;
            let regionMap = {};
            regions.forEach(region => {
                regionMap[region.regionName] = region.cellTypeSubregions;
            });
            return regionMap;
        }

    }

    render() {
        let structures = this.processHierarchyText();
        let tabs = <Col xs="12">
            <CellTypeTabs data={structures} handleCellTypeClick={this.handleCellTypeClick} />
        </Col>;
        if (this.state.isProcessing) {
            tabs = <Spinner color='primary' />;
        }
        return (
            <Container className="mt-3 rounded border p-3 shadow-sm search-container">
                <Row>
                    <Col md='12'>
                        <h5 className="mb-3">Select a cell type</h5>
                    </Col>
                </Row>
                <Row>
                    {tabs}
                </Row>
            </Container>

        );
    }
}

export default NephronSchemaCard;