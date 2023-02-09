import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';

class TopContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
        show_vitessce_button: true
    }
    this.handleGoogleAnalyticsEvent = handleGoogleAnalyticsEvent.bind(this);
  }
  render() {
    return (
        <Container className="landing container container-expanded mt-2 rounded border p-3 shadow-sm">
          <Row><h3 className="subtitle">Kidney Precision Medicine Project</h3></Row>
          <Row><h1 className="title">Kidney Tissue Atlas</h1></Row>
          <Row><p>The Kidney Tissue Atlas is a set of interactive tools built to promote retrieval, exploration, discovery, and analysis of the KPMP data by the greater research community.</p></Row>
          <Col xs='12'>
            <p><a rel="noreferrer" target='_blank' href='https://www.kpmp.org/help-docs/data' onClick={() => {
              this.handleGoogleAnalyticsEvent('Atlas Home', 'Navigation', 'Help: learn about data types')}}>
                Learn more about our data types and methodologies
            </a></p>
              <p><strong>IMPORTANT: Please follow this <a href="https://www.kpmp.org/help-docs/study-overview?tabname=citingkpmpdata" target="_blank" rel="noreferrer">citation guideline</a> when presenting or publishing KPMP data.</strong></p>
          </Col>
        </Container>
    );
  }
}

export default TopContent;
