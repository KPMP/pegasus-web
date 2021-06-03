import React, { Component } from 'react';
import { TabPane, Row, Col, Collapse } from 'reactstrap';
import TubuleSchematic from './TubuleSchematic';
import CellTypeEnum from './CellTypeEnum';

class AccordionTabSection extends Component {

    constructor(props) {
        super(props);
        this.state = { collapse: 0 }
    }

    toggle = (toggleEvent) => {
        let event = toggleEvent.target.dataset.event;
        this.setState({ collapse: this.state.collapse === Number(event) ? 0 : Number(event) });
    }
    toggleWithoutResetting = (toggleEvent) => {
        let event = toggleEvent.target.dataset.event;
        this.setState({ collapse: Number(event) });
    }

    handleSchematicHoverEnter = (cellType) => {
        this.props.setActiveCell(cellType);
    }

    handleSchematicHoverLeave = (cellType) => {
        this.props.setActiveCell(CellTypeEnum.ALL);
    }

    processTerms = () => {
        let subregions = this.props.data;
        const { collapse } = this.state;
        let subregionText = subregions.map((subregion, index) => {
            let cellTypes = subregion.cellTypes.map((cellType) => {
                return <li>
                    <button
                        onClick={() => this.props.handleCellTypeClick(cellType.cellType)}
                        onMouseEnter={() => { this.handleSchematicHoverEnter(cellType.cellType) }}
                        type="button"
                        className={`btn btn-link text-left p-0 ${(this.props.activeCell === cellType.cellType) ? 'pseudohover' : ''}`}>
                        {cellType.cellType}</button>
                </li>
            });
            let collapsed = this.state.collapse;
            return (
                <div className='cell-type-list mb-1 px-3 py-2' key={index}>
                    <span onClick={this.toggle} data-event={index} className={`${collapsed === index ? "open" : "collapsed"}`}>{subregion.subregionName}</span>
                    <Collapse isOpen={collapse === index}>
                        <div className="px-4 py-1">{cellTypes}</div>
                    </Collapse>
                </div>
            );

        });
        return subregionText;
    }

    render() {
        let cellTypes = this.processTerms();
        return (
            <TabPane tabId={this.props.tabId}>
                <Row>
                    <Col sm="6">
                        {cellTypes}
                    </Col>
                    <Col sm="6">
                        {this.props.isNephronSchematic ?
                            <TubuleSchematic
                                activeCell={this.props.activeCell}
                                handleCellTypeClick={this.props.handleCellTypeClick}
                                setActiveTab={this.props.setActiveTab}
                                setActiveCell={this.props.setActiveCell}
                                toggleCollapseTab={this.toggleWithoutResetting}
                                handleSchematicHoverEnter={this.handleSchematicHoverEnter}
                                handleSchematicHoverLeave={this.handleSchematicHoverLeave}
                            /> :
                            <div className='tbd-schema'> Schematic TBD</div>
                        }
                    </Col>
                </Row>
            </TabPane >
        );
    }
}

export default AccordionTabSection;
