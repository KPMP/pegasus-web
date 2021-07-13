import React, { Component } from 'react';
import { TabPane, Row, Col } from 'reactstrap';
import GlomerulusSchematic from './GlomerulusSchematic';
import CellTypeEnum from './CellTypeEnum';

class TabSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeCell: ''
        }
    }

    processTerms = () => {
        let subregions = this.props.data;
        let subregionText = subregions.map((subregion) => {
            let cellTypes = subregion.cellTypes.map((cellType) => {
                return <li key={cellType.cellType} className='indent-2'>
                    <button
                        onClick={() => this.props.handleCellTypeClick(cellType.cellType)}
                        onMouseEnter={() => { this.handleSchematicHoverEnter(cellType.cellType); this.setState({ activeCell: cellType.cellType }) }}
                        type="button"
                        className={`btn btn-link text-left p-0 ${(this.props.activeCell === cellType.cellType) ? 'pseudohover' : ''}`} >
                        {cellType.cellType}
                    </button>
                </li>
            });

            return (
                <section key={subregion.subregionName}><li className="subregion-name indent-1">
                    <button
                        onClick={() => this.props.handleCellTypeClick(subregion.subregionName)}
                        onMouseEnter={() => { this.handleSchematicHoverEnter(subregion.subregionName); this.setState({ activeCell: subregion.subregionName }) }}
                        type="button"
                        className={`btn btn-link text-left p-0 ${(this.props.activeCell === subregion.subregionName) ? 'pseudohover' : ''}`} >
                            {subregion.subregionName}   
                    </button></li>
                    <ul className='cell-type-list'>
                        {cellTypes}
                    </ul>
                </section>
            );

        });
        return subregionText;
    }

    handleSchematicHoverEnter = (cellType) => {
        if(this.props.setActiveCell) {
            this.props.setActiveCell(cellType);
        }
    }

    handleSchematicHoverLeave = (cellType) => {
        if (this.props.setActiveCell) {
            this.props.setActiveCell(CellTypeEnum.ALL);
        }
    }

    render() {
        let cellTypes = this.processTerms();
        return (
            <TabPane tabId={this.props.tabId}>
                <Row>
                    <Col sm="5">
                        <div className='cell-type-list p-3'>
                            <button
                                onClick={() => this.props.handleCellTypeClick(this.props.topLevelLink)}
                                onMouseEnter={() => { this.handleSchematicHoverEnter(this.props.topLevelLink); this.setState({ activeCell: this.props.topLevelLink }) }}
                                type="button"
                                className={`btn btn-link text-left p-0 ${(this.props.activeCell === this.props.topLevelLink) ? 'pseudohover' : ''}`}>
                                    {this.props.topLevelLink}
                                </button>
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