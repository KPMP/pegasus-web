import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DataTypeSelectorContainer from './DataTypeSelectorContainer';
import { faShare } from "@fortawesome/free-solid-svg-icons";
import queryString from 'query-string';

class RegionalProteomics extends Component {
  constructor(props) {
    super(props);
    this.state = { rtAllPlotData: [], rtAllTableData: [], rtGTPlotData: [], rtGTTableData: [], selectedComparison: 'all_segments', selectedPlot: 'box' };
    if (!this.props.tissueType) {
        this.props.setTissueType('all')
    }
    const queryParam = queryString.parse(props.location.search);
    if (queryParam && queryParam.dataType) {
        this.props.resetState();
        props.setDataType('rp');
        window.open(props.location.pathname, '_self');
    }
};
    render() {
        return (
            <div className='height-wrapper mb-3 mt-3'>
              <Container id='outer-wrapper'>
                <DataTypeSelectorContainer/>
                <Container className='mt-3 rounded border p-3 shadow-sm mb-5'>
                            <div className="regional-search-copy">
                                <Row xs='12'>
                                    <Col lg={{ size: 1, offset: 4 }}>
                                        <FontAwesomeIcon className={"fa fa-share"} icon={faShare} />
                                    </Col>
                                    <Col lg='7'>
                                        <h6>Gene Expression:</h6>
                                        <p>Enter a gene above to get started</p>
                                    </Col>
                                </Row>
                            </div>
                        </Container >
              </Container>
            </div>
        )
    }
}

export default RegionalProteomics;
