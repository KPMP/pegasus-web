import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import SamplesByDataTypeTableContainer from './SamplesByDataTypeTableContainer';
import AvailableDatasetsTable from './AvailableDatasetsTable';
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';
import { fetchSummaryData, fetchGeneDatasetSummary, fetchAvailableData, fetchTissueTypeSummaryCounts} from '../../helpers/ApolloClient';
import { availableDataVisibilityFilter } from '../../helpers/Utils';

import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
       explorerSummary = explorerSummary
                                .slice()
                                .sort(this.compare)
                                .filter(availableDataVisibilityFilter)
        
        spatialViewerSummary = spatialViewerSummary
                                .slice()
                                .sort(this.compare)
                                .filter(availableDataVisibilityFilter)

        explorerSummary.unshift({dataType: "Explorer"})
        explorerSummary.push({dataType: "Spatial Viewer"})
        const summaryData = explorerSummary.concat(spatialViewerSummary)
        
       const availableDatasets = await fetchAvailableData()
       this.setState({ summaryData, availableDatasets})
    }

    render() {

        return (
            <Container className="landing mt-3 mb-4 rounded border p-3 shadow-sm">
                <Row><h2 className="data-summary">Atlas Data Summary</h2></Row>
                <Row><p>IMPORTANT: Please follow this <a href="https://www.kpmp.org/help-docs/study-overview?tabname=citingkpmpdata">citation guideline</a> when presenting or publishing data from the Kidney Tissue Atlas.</p></Row>

                <h1 className="centered kpmp-color-dark"><span><FontAwesomeIcon className='kpmp-color-dark pr-2' icon={faPerson} /></span>PARTICIPANTS</h1>
                <Row>
                    <Col md='4' lg='4'>
                        <div className="centered background-light-blue kpmp-color-dark">
                            <div>
                                <span className="font-size-three-rem">{fetchTissueTypeSummaryCounts("CKD")}</span>
                            </div>
                            <div>
                                <span className="font-size-one-one-half-rem">CKD</span>
                            </div>
                        </div>
                    </Col>
                    <Col md='4' lg='4'>
                        <div className="centered background-light-blue kpmp-color-dark">
                            <div>
                                <span className="font-size-three-rem">{fetchTissueTypeSummaryCounts("AKI")}</span>
                            </div>
                            <div>
                                <span className="font-size-one-one-half-rem">AKI</span>
                            </div>
                        </div>
                    </Col>
                    <Col md='4' lg='4'>
                        <div className="centered background-light-blue kpmp-color-dark">
                            <div>
                                <span className="font-size-three-rem">{fetchTissueTypeSummaryCounts("HEALTHY_REFERENCE")}</span>
                            </div>
                            <div>
                                <span className="font-size-one-one-half-rem">REFERENCE</span>
                            </div>
                        </div>
                    </Col>
                </Row>
                
                <Row><h5 className="sub-header lowered">Participants by -omics type</h5></Row>
                <Row><p>A subset of the raw data from the Data Repository has been analyzed and made available for interactive mining in Explorer and Spatial Viewer.</p></Row>


                <Row>
                    <SamplesByDataTypeTableContainer summary={this.state.summaryData}/>
                </Row>



                <Row><h5 className="sub-header lowered">Files in the Data Repository by -omics type</h5></Row>
                <Row><p>The datasets available in the Repository are a combination of raw and processed data from KPMP participant biopsies and reference tissue samples.</p></Row>
            
                <Row>
                    <AvailableDatasetsTable history={this.props.history} availableDatasets={this.state.availableDatasets} />
                </Row>
            </Container>

        );
    }
}

export default DataSummary;