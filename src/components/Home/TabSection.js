import React, { Component } from 'react';
import { TabPane, Row, Col } from 'reactstrap';
import GlomerulusSchematic from './GlomerulusSchematic';
import CellTypeEnum from './CellTypeEnum';

class TabSection extends Component {

    constructor(props) {
        super(props);
        this.state = { activeCell: CellTypeEnum.ALL };
    }

    static getDerivedStateFromProps = (props) => {
        if (props.tabId !== props.activeTab) {
            return { activeCell: CellTypeEnum.ALL }
        }
    }

    processTerms = () => {
        let subregions = this.props.data;
        let subregionText = subregions.map((subregion) => {
            let cellTypes = subregion.cellTypes.map((cellType) => {
                return <li>
                    <button
                        onClick={() => this.props.handleCellTypeClick(cellType.cellType)}
                        onMouseEnter={() => { this.handleSchematicHoverEnter(cellType.cellType) }}
                        type="button"
                        className={`btn btn-link text-left p-0 ${(this.state.activeCell === cellType.cellType) ? 'pseudohover' : ''}`}>
                        {cellType.cellType}
                    </button>
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
        return subregionText;
    }

    handleSchematicHoverEnter = (cellType) => {
        this.setState({ activeCell: cellType })
    }

    handleSchematicHoverLeave = (cellType) => {
        this.setState({ activeCell: CellTypeEnum.ALL })
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
                                activeCell={this.state.activeCell}
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