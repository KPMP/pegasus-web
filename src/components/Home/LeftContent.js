import React, { Component } from 'react';
import { Container, Row, Button } from 'reactstrap';

class LeftContent extends Component {
    render() {
        return(
              <Row>
                <Container className="mt-3 rounded border p-3 shadow-sm">
                  <h5>Atlas Explorer</h5>
                  <div>Search for markers or cell types of interest and view summary data vizualizations across the various KPMP 'omics' technologies.
                  </div>
                  <div className='mt-3'>
                    <Button color='primary' href='/explorer' size='lg' block>Go to Explorer</Button>
                  </div>
                </Container>
                <Container className="mt-3 rounded border p-3 shadow-sm">
                  <h5>Atlas Repository</h5>
                  <div>
                    Download raw gene data generated from KPMP participant biopsies and reference tissue samples.
                  </div>
                  <div className='mt-3'>
                    <Button color='primary' href='/repository' size='lg' block>Go to Repository</Button>
                  </div>
                </Container>
                <Container className="mt-3 rounded border p-3 shadow-sm">
                  <h5>KPMP Central Biorepository</h5>
                  <div>
                    Learn more about ancillary study opprotunities using KPMP biospeceimens and other resources.
                  </div>
                  <div className='mt-3'>
                    <Button color='primary' href='/repository' size='lg' block>Collaborate with us</Button>
                  </div>
                </Container>
              </Row>
        );
    }
}

export default LeftContent;