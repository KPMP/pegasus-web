import React, { Component } from 'react';
import { Col, Row, Button } from 'reactstrap';

class Oops extends Component {
  render() {
    return (
      <article className="container-fluid height-wrapper">
        <Row id="oops-content">
          <Col xs={0} md={2}>
            &nbsp;
          </Col>
          <Col xs={12} md={4} className={'text-center'}>
            <img
              src="/img/oops.png"
              alt="Oops, something went wrong"
              id="oops-image"
            />
          </Col>
          <Col xs={12} md={6}>
            <p className="oops-big">Oops...</p>
            <p className="oops-small">
              Looks like something went wrong.
              <br />
              We&#39;re working on it.
            </p>
            <p className="oops-button-container">
              <Button
                className="btn btn-primary"
                onClick={() => (window.location.href = '/explorer')}
              >
                Back to Home
              </Button>
            </p>
          </Col>
        </Row>
      </article>
    );
  }
}

export default Oops;
