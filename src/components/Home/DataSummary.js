import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import SamplesPlot from './SamplesPlot';
import SamplesByDataTypeTable from './SamplesByDataTypeTable';

class DataSummary extends Component {
    render() {
        return (
            <Container className="landing mt-3 rounded border p-3 shadow-sm">
                <Row><h3 className="subtitle">Kidney Precision Medicine Project</h3></Row>
                <Row><h1 className="title">Kidney Tissue Atlas</h1></Row>
                <Row><p>The Kidney Tissue Atlas is a set of interactive tools built to promote retrieval, exploration, discovery, and analysis of the KPMP data by the greater research community.</p></Row>

                <Col xs='12'>
                    <a rel="noreferrer" target='_blank' href='https://www.kpmp.org/help-docs/data'>Learn more about our data types and methodologies</a>
                </Col>

                <Row><h2 className="data-summary">Atlas Data Summary</h2></Row>
                <Row><h5 className="sub-header">What data can I find in the Atlas Explorer?</h5></Row>
                <Row><p>A subset of the raw data from the Data Repository has been analyzed and made available for interactive mining in the Atlas Explorer.</p></Row>

                <Row>
                    <SamplesByDataTypeTable />
                </Row>

                <Row><h5 className="sub-header lowered">What data can I find in the Data Repository?</h5></Row>
                <Row><p>The datasets available in the repository are a combination of raw and processed data from KPMP participant biopsies and reference tissue samples.</p></Row>


                <Row><p>Current data types in the repository include:</p></Row>
                <Row><h5 className="controlled-data"><span className="controlled-data-asterisk">*</span> = Controlled data. <a className="learn-link" href="https://www.kpmp.org/controlled-data">Learn how to access controlled data.</a></h5></Row>
                <Row>
                    <h5 className="samples-plot-header">Number of files</h5>
                </Row>
                <SamplesPlot />
                <Row>
                    <hr className="samples-plot-line" />
                </Row>
                <Row>
                    <p className="samples-plot-files">Total Files: 1,537</p>
                </Row>

                <Row className='mt-4'>
                </Row>
            </Container>

        );
    }
}

export default DataSummary;