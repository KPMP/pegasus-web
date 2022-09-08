import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import SamplesPlot from './SamplesPlot';
import SamplesByDataTypeTable from './SamplesByDataTypeTable';
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';
import { fetchSummaryData, fetchGeneDatasetSummary} from '../../helpers/ApolloClient';

class DataSummary extends Component {

    constructor(props) {
        super(props);
        this.handleGoogleAnalyticsEvent = handleGoogleAnalyticsEvent.bind(this);
        this.state = {
            spatialViewerSummary: [],
            explorerSummary: []
        }
    }
    compare( a, b ) {
        if ( a && b && a.dataType < b.dataType ){
          return -1;
        }
        if ( a.dataType > b.dataType ){
          return 1;
        }
        return 0;
    }

    async componentDidMount() {  
       let spatialViewerSummary = await fetchSummaryData("spatialViewerSummary")
       let explorerSummary = await fetchGeneDatasetSummary("")
       explorerSummary = explorerSummary.slice().sort(this.compare)
       spatialViewerSummary = spatialViewerSummary.slice().sort(this.compare)
       this.setState({ spatialViewerSummary, explorerSummary})
    }

    render() {

        return (
            <Container className="landing mt-3 rounded border p-3 shadow-sm">
                <Row><h3 className="subtitle">Kidney Precision Medicine Project</h3></Row>
                <Row><h1 className="title">Kidney Tissue Atlas</h1></Row>
                <Row><p>The Kidney Tissue Atlas is a set of interactive tools built to promote retrieval, exploration, discovery, and analysis of the KPMP data by the greater research community.</p></Row>

                <Col xs='12'>
                    <a rel="noreferrer" target='_blank' href='https://www.kpmp.org/help-docs/data' onClick={() => {this.handleGoogleAnalyticsEvent('Navigation', 'Help', 'learn about data types')}}>Learn more about our data types and methodologies</a>
                </Col>

                <Row><h2 className="data-summary">Atlas Data Summary</h2></Row>
                <Row><h5 className="sub-header">What data can I find in the Explorer?</h5></Row>
                <Row><p>A subset of the raw data from the Repository has been analyzed and made available for interactive mining in the Explorer. The table below shows the total number of participants for which we have data in the tool.</p></Row>

                <Row>
                    <SamplesByDataTypeTable summary={this.state.explorerSummary}/>
                </Row>

                <Row><h5 className="sub-header lowered">What data can I find in the Repository?</h5></Row>
                <Row><p>The datasets available in the Repository are a combination of raw and processed data from KPMP participant biopsies and reference tissue samples.</p></Row>


                <Row><p>Current data types in the Repository include:</p></Row>
                <Row><h5 className="controlled-data"><span className="controlled-data-asterisk">*</span> = <a  onClick={() => {this.handleGoogleAnalyticsEvent('Navigation', 'controlled data')}} className="learn-link" rel="noreferrer" target='_blank' href="https://www.kpmp.org/controlled-data">
                    Controlled data</a></h5></Row>
                <Row>
                    <h5 className="samples-plot-header">Number of files</h5>
                </Row>
                <SamplesPlot />
                <Row>
                    <p className="samples-plot-files">Total Files: 3,778</p>
                </Row>

                <Row className='mt-4'>
                </Row>
                <Row><h5 className="sub-header">What data can I find in the Spatial Viewer?</h5></Row>
                <Row><p>The collection of spatial datasets that may be visualized in the Vitessce visual integration tool. The table below shows the total number of participants for which we have data in the tool.</p></Row>

                <Row>
                    <SamplesByDataTypeTable summary={this.state.spatialViewerSummary} />
                </Row>
            </Container>

        );
    }
}

export default DataSummary;