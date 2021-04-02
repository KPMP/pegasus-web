import React, {Component} from 'react';
import { TabPane, Row, Col } from 'reactstrap';

class TabSection extends Component {

    processTerms = () => {
        let subregions = this.props.data;
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
        return subregionText;
    }

    render() {
        let cellTypes = this.processTerms();
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
                            <img alt='nephron schema' src={this.props.img} className='nephron-schema img-fluid'></img>
                        }
                    </Col>
                </Row>
            </TabPane>


        );
    }
}

export default TabSection;