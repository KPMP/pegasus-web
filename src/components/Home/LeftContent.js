import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';

class LeftContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
        show_vitessce_button: true
    }
    this.handleGoogleAnalyticsEvent = handleGoogleAnalyticsEvent.bind(this);
  }
  render() {
    return (
      <div id="leftcontent">
        <Container className="mt-3 rounded border p-3 shadow-sm">
          <h5>Explorer</h5>
          <div>
            <p>
              Search for markers or cell types of interest and view summary data visualizations across the various KPMP 'omics' technologies.
            </p>
          </div>
          <div className='mt-3'>
            <Button className="w-100" color='primary' href='/explorer' size='lg' block onClick={() => { this.handleGoogleAnalyticsEvent('Atlas Home', 'Navigation', 'explorer home') }}>Go to Explorer</Button>
          </div>
        </Container>
        <Container className="mt-3 rounded border p-3 shadow-sm">
          <h5>Repository</h5>
          <div>
            <p>
              Download raw gene data generated from KPMP participant biopsies and reference tissue samples.
            </p>
          </div>
          <div className='mt-3'>
            <Button className="w-100" color='primary' href='/repository' size='lg' block onClick={() => { this.handleGoogleAnalyticsEvent('Atlas Home', 'Navigation', 'repository home') }}>Go to Repository</Button>
          </div>
        </Container>
        {this.state.show_vitessce_button &&
        <Container className="mt-3 rounded border p-3 shadow-sm">
          <h5>Spatial Viewer</h5>
          <div>
            <p>
              View and interact with spatial data from various KPMP imaging technologies.
            </p>
          </div>
          <div className='mt-3'>
            <Button className="w-100" color='primary' href='/spatial-viewer' size='lg' block onClick={() => { this.handleGoogleAnalyticsEvent('Atlas Home', 'Navigation', 'spatial viewer home') }}>Go to Spatial Viewer</Button>
          </div>
        </Container>
        }
        <Container className="mt-3 rounded border p-3 shadow-sm">
          <h5>KPMP Central Biorepository</h5>
          <div>
            <p>
              Learn more about ancillary study opportunities using KPMP biospecimens and other resources.
            </p>
          </div>
          <div className='mt-3'>
            <Button className="w-100" color='primary' href='https://www.kpmp.org/collaboration' size='lg' block onClick={() => { this.handleGoogleAnalyticsEvent('Atlas Home', 'Navigation', 'collaborate') }}>Collaborate with us</Button>
          </div>
        </Container>
        <Container className="mt-3 rounded border p-3 shadow-sm">
          <h5>KPMP Collaborator Sites & Tools</h5>
          <div>
            <p>
                <a target="_blank" rel="noreferrer" href='https://hubmapconsortium.org/'>The Human BioMolecular Atlas Program (HuBMAP)</a>
                <br/>
                <a target="_blank" rel="noreferrer" href='https://humanatlas.io/'>HuBMAP Human Reference Atlas (HRA)</a>
                <br/>
                <a target="_blank" rel="noreferrer" href='https://apps.humanatlas.io/eui/kpmp.html'>HuBMAP HRA Explorer for KPMP</a>
                <br/>
                <a target="_blank" rel="noreferrer" href='https://www.humancellatlas.org/'>Human Cell Atlas (HCA)</a>
                <br />
                <a target="_blank" rel="noreferrer" href='https://data.humancellatlas.org/'>HCA Data Portal</a>
                <br />
                <a target="_blank" rel="noreferrer" href='https://data.humancellatlas.org/hca-bio-networks/kidney/datasets'>HCA Kidney Network Datasets</a>
            </p>
          </div>
        </Container>
      </div>
    );
  }
}

export default LeftContent;
