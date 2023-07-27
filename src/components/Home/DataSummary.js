import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import SamplesByDataTypeTableContainer from './SamplesByDataTypeTableContainer';
import AvailableDatasetsTable from './AvailableDatasetsTable';
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';
import { fetchAtlasSummaryRows} from '../../helpers/ApolloClient';

import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ParticipantSummary from './ParticipantSummary';

class DataSummary extends Component {

    constructor(props) {
        super(props);
        this.handleGoogleAnalyticsEvent = handleGoogleAnalyticsEvent.bind(this);
    }


    render() {

        return (
            <Container className="landing mt-3 mb-4 rounded border p-3 shadow-sm">
                <Row><h2 className="data-summary">Atlas Data Summary</h2></Row>
                <Row><p>IMPORTANT: Please follow this <a href="https://www.kpmp.org/help-docs/study-overview?tabname=citingkpmpdata">citation guideline</a> when presenting or publishing data from the Kidney Tissue Atlas.</p></Row>

                <h1 className="centered kpmp-color-dark"><span><FontAwesomeIcon className='kpmp-color-dark pe-2' icon={faPerson} /></span>PARTICIPANTS</h1>
                <ParticipantSummary/>
                
                <Row><h5 className="sub-header lowered">Participants by -omics type</h5></Row>
                <Row><p>A subset of the raw data from the Data Repository has been analyzed and made available for interactive mining in Explorer and Spatial Viewer.</p></Row>

                <Row>
                    <SamplesByDataTypeTableContainer/>
                </Row>

                <Row><h5 className="sub-header lowered">Files in the Data Repository by -omics type</h5></Row>
                <Row><p>The datasets available in the Repository are a combination of raw and processed data from KPMP participant biopsies and reference tissue samples.</p></Row>
            
                <Row>
                    <AvailableDatasetsTable history={this.props.history} />
                </Row>
            </Container>

        );
    }
}

export default DataSummary;
