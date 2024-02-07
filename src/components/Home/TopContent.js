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
          <div><h3 className="subtitle">Kidney Precision Medicine Project</h3></div>
          <div><h1 className="title">Kidney Tissue Atlas</h1></div>
          <div>
            <Col xs='12'>
              The Kidney Tissue Atlas is a set of interactive tools built to promote retrieval, exploration, discovery, and analysis of the KPMP data by the greater research community.
            </Col>
          </div>
          <div>
            <Col xs='12'>
                <a rel="noreferrer" target='_blank' href='https://www.kpmp.org/help-docs/data' onClick={() => {
                this.handleGoogleAnalyticsEvent('Atlas Home', 'Navigation', 'Help: learn about data types')}}>
                  Learn more about our data types and methodologies
              </a>
            </Col>
          </div>
        </Container>
    );
  }
}

export default TopContent;
