import React, {Component} from 'react';
import { TabPane, Row, Col } from 'reactstrap';

class TabSection extends Component {

    processTerms = () => {
        let subregions = this.props.data;
        let subregionText = subregions.map((subregion) => {
            let cellTypes = subregion.cellTypes.map((cellType) => {
                return <li>
                    <button onClick={() => this.handleCellTypeClick(cellType.cellType)} type="button" className="btn btn-link text-left p-0">{cellType.cellType}</button>
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
                        <div className='cell-type-list p-3'>
                            {cellTypes}
                        </div>
                    </Col>
                    <Col sm="8">
                        {this.props.img &&
                            <img alt='nephron schema' src={this.props.img} className={classNames}></img>
                        }
                    </Col>
                </Row>
            </TabPane>


        );
    }
}

export default TabSection;