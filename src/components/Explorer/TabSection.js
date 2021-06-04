import React, { Component } from 'react';
import { TabPane, Row, Col } from 'reactstrap';
import GlomerulusSchematic from './GlomerulusSchematic';
import CellTypeEnum from './CellTypeEnum';

class TabSection extends Component {

    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            activeCell: ''
        }
    }

    processTerms = () => {
        let subregions = this.props.data;
        let subregionText = subregions.map((subregion) => {
            let cellTypes = subregion.cellTypes.map((cellType) => {
                console.log('celltype?', cellType.cellType, this.props.activeCell)
                return <li>
                    <button
                        onClick={() => this.props.handleCellTypeClick(cellType.cellType)}
                        onMouseEnter={() => { this.handleSchematicHoverEnter(cellType.cellType); this.setState({ activeCell: cellType.cellType }) }}
                        type="button"
                        className={`btn btn-link text-left p-0 ${(this.props.activeCell === cellType.cellType) ? 'pseudohover' : ''}`}>
                        {cellType.cellType}
                    </button>
                </li>
            });

            return (
                <section><li className="subregion-name">{subregion.subregionName}</li>
                    <ul className='cell-type-list'>
                        {cellTypes}
                    </ul>
                </section>
            );

        });
        return subregionText;
    }

    handleSchematicHoverEnter = (cellType) => {
        this.props.setActiveCell(cellType);
    }

    handleSchematicHoverLeave = (cellType) => {
        this.props.setActiveCell(CellTypeEnum.ALL);
    }

    render() {
        let cellTypes = this.processTerms();
        return (
            <TabPane tabId={this.props.tabId}>
                <Row>
                    <Col sm="6">
                        <div className='cell-type-list p-3'>
                            {cellTypes}
                        </div>
                    </Col>
                    <Col sm="6">

                        {this.props.isGlomerulusSchematic ?
                            <GlomerulusSchematic
                                setActiveTab={this.props.setActiveTab}
                                activeCell={this.props.activeCell}
                                setActiveCell={this.props.setActiveCell}
                                handleCellTypeClick={this.props.handleCellTypeClick}
                                handleSchematicHoverEnter={this.handleSchematicHoverEnter}
                                handleSchematicHoverLeave={this.handleSchematicHoverLeave}
                            />
                            :
                            <div className='tbd-schema'> Schematic TBD</div>
                        }
                    </Col>
                </Row>
            </TabPane >


        );
    }
}

export default TabSection;