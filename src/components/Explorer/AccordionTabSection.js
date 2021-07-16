import React, { Component } from 'react';
import { TabPane, Row, Col, Collapse } from 'reactstrap';
import TubuleSchematic from './TubuleSchematic';
import CellTypeEnum from './CellTypeEnum';

class AccordionTabSection extends Component {

    constructor(props) {
        super(props);
        this.state = { collapse: 0 }
    }

    componentDidUpdate(prevProps, prevState) {

        // force the accordion to drop when coming from the glom tab
        if (prevProps.activeCell !== CellTypeEnum.MACULA_DENSA_CELL
            && this.props.activeCell === CellTypeEnum.MACULA_DENSA_CELL) {
            this.toggleWithoutResetting({ target: { dataset: { event: 3 } } })
            this.setState({ activeCellState: CellTypeEnum.MACULA_DENSA_CELL })
        }
        if (prevProps.activeCell !== CellTypeEnum.THICK_ASCENDING_LIMB_CELL
            && this.props.activeCell === CellTypeEnum.THICK_ASCENDING_LIMB_CELL) {
            this.toggleWithoutResetting({ target: { dataset: { event: 2 } } })
            this.setState({ activeCellState: CellTypeEnum.THICK_ASCENDING_LIMB_CELL })
        }

        if (prevProps.activeCell !== CellTypeEnum.PROXIMAL_TUBULE_EPITHELIAL_SEGMENT_1
            && this.props.activeCell === CellTypeEnum.PROXIMAL_TUBULE_EPITHELIAL_SEGMENT_1) {
            this.toggleWithoutResetting({ target: { dataset: { event: 0 } } })
            this.setState({ activeCellState: CellTypeEnum.PROXIMAL_TUBULE_EPITHELIAL_SEGMENT_1 })
        }


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
        if(this.props.setActiveCell) {
            this.props.setActiveCell(cellType);
        }
        
    }

    handleSchematicHoverLeave = (cellType) => {
        if(this.props.setActiveCell) {
            this.props.setActiveCell(CellTypeEnum.ALL);
        }
    }

    processTerms = () => {
        let subregions = this.props.data;
        const { collapse } = this.state;
        let subregionText = subregions.map((subregion, index) => {
            let cellTypes = subregion.cellTypes.map((cellType) => {
                return <li key={cellType.cellType}>
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
                <div className='cell-type-list mb-1 px-3 py-2 subregion-name' key={subregion.subregionName}>
                    <span onClick={this.toggle} data-event={index} className={`${collapsed === index ? "open" : "collapsed"}`}>
                        <span onClick={() => this.props.handleCellTypeClick(subregion.subregionName)}
                             onMouseEnter={() => { this.handleSchematicHoverEnter(subregion.subregionName) }}
                             type='button'
                             className={`btn-link text-left p-0 ${(this.props.activeCell === subregion.subregionName) ? 'pseudohover' : ''}`}>
                                 {subregion.subregionName}</span>
                    </span>
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
                    <Col sm="5">
                        <div className='cell-type-list p-3'>
                            <button
                                onClick={() => this.props.handleCellTypeClick(this.props.topLevelLink)}
                                onMouseEnter={() => { this.handleSchematicHoverEnter(this.props.topLevelLink);  }}
                                type="button"
                                className={`btn btn-link text-left p-0 ${(this.props.activeCell === this.props.topLevelLink) ? 'pseudohover' : ''}`}>
                                    {this.props.topLevelLink}
                                </button>
                            {cellTypes}
                        </div>
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
