import React, { Component } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';

class LeftContent extends Component {

  constructor(props) {
    super(props);

    this.handleGoogleAnalyticsEvent = handleGoogleAnalyticsEvent.bind(this);
  }
  render() {
    return (
      <Row>
        <Container className="mt-3 rounded border p-3 shadow-sm">
          <h5>Atlas Explorer</h5>
          <div>
            <p>
              Search for markers or cell types of interest and view summary data visualizations across the various KPMP 'omics' technologies.
            </p>
          </div>
          <div className='mt-3'>
            <Button color='primary' href='/explorer' size='lg' block onClick={() => { this.handleGoogleAnalyticsEvent('Navigation', 'explorer') }}>Go to Explorer</Button>
          </div>
        </Container>
        <Container className="mt-3 rounded border p-3 shadow-sm">
          <h5>Atlas Repository</h5>
          <div>
            <p>
              Download raw gene data generated from KPMP participant biopsies and reference tissue samples.
            </p>
          </div>
          <div className='mt-3'>
            <Button color='primary' href='/repository' size='lg' block onClick={() => { this.handleGoogleAnalyticsEvent('Navigation', 'repository') }}>Go to Repository</Button>
          </div>
        </Container>
        <Container className="mt-3 rounded border p-3 shadow-sm">
          <h5>Spacial Data</h5>
          <div>
            <p>
              View and interact with KPMP participant spacial data.
            </p>
          </div>
          <div className='mt-3'>
            <Button color='primary' href='/vitessce' size='lg' block onClick={() => { this.handleGoogleAnalyticsEvent('Navigation', 'vitessce') }}>Go to Spacial Data</Button>
          </div>
        </Container>
        <Container className="mt-3 rounded border p-3 shadow-sm">
          <h5>KPMP Central Biorepository</h5>
          <div>
            <p>
              Learn more about ancillary study opportunities using KPMP biospecimens and other resources.
            </p>
          </div>
          <div className='mt-3'>
            <Button color='primary' href='https://www.kpmp.org/collaboration' size='lg' block onClick={() => { this.handleGoogleAnalyticsEvent('Navigation', 'collaborate') }}>Collaborate with us</Button>
          </div>
        </Container>
      </Row>
    );
  }
}

export default LeftContent;