import React, { Component } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { trackClickEvent } from '../../helpers/googleAnalyticsHelper';

class LeftContent extends Component {

  constructor(props) {
      super(props);

      this.trackClickEvent = trackClickEvent.bind(this);
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
            <Button color='primary' href='/explorer' size='lg' block onClick={() => {this.trackClickEvent('explorer')}}>Go to Explorer</Button>
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
            <Button color='primary' href='/repository' size='lg' block onClick={() => {this.trackClickEvent('repository')}}>Go to Repository</Button>
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
            <Button color='primary' href='https://www.kpmp.org/ancillary-studies' size='lg' block onClick={() => {this.trackClickEvent('collaborate')}}>Collaborate with us</Button>
          </div>
        </Container>
      </Row>
    );
  }
}

export default LeftContent;