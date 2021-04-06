import React, {Component} from 'react';
import { TabPane, Row, Col, Collapse } from 'reactstrap';

class AccordionTabSection extends Component {

    constructor(props) {
        super(props);
        this.state = { collapse: 0 }
    }

    toggle = (toggleEvent) => {
        let event = toggleEvent.target.dataset.event;
        this.setState({collapse: this.state.collapse === Number(event) ? 0 : Number(event)});
    }

    processTerms = () => {
        let subregions = this.props.data;
        const {collapse} = this.state;
        let subregionText = subregions.map((subregion, index) => {
            let cellTypes = subregion.cellTypes.map((cellType) => {
                return <li>
                    <button onClick={() => this.props.handleCellTypeClick(cellType.cellType)} type="button" className="btn btn-link text-left p-0">{cellType.cellType}</button>
                </li>
            });
            let collapsed = this.state.collapse;
            return (
                <div className='cell-type-list mb-1 px-3 py-2' key={index}>
                    <span onClick={this.toggle} data-event={index} className={`${collapsed === index ? "open": "collapsed"}`}>{subregion.subregionName}</span>
                    <Collapse isOpen={collapse === index}>
                        <div className="p-2">{cellTypes}</div>
                    </Collapse>
                </div>
            );
                
        });
        return subregionText;
    }

    render() {
        let cellTypes = this.processTerms();
        let classNames = 'nephron-schema img-fluid ';
        if (this.props.extraClassName) {
            classNames = classNames + this.props.extraClassName;
        }
        return (
            <TabPane tabId={this.props.tabId}>
                <Row>
                    <Col sm="4">
                        {cellTypes}
                    </Col>
                    <Col sm="8">
                        {this.props.img ?
                            <img alt='nephron schema' src={this.props.img} className={classNames}></img>
                        :
                            <div className='tbd-schema'> Schematic TBD</div>
                        }
                    </Col>
                </Row>
            </TabPane>


        );
    }
}

export default AccordionTabSection;