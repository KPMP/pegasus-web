import React, { Component } from 'react';
import {Row, Col } from 'reactstrap';

class ParticipantSummary extends Component {
  state = {
    text: this.props.text
  };
  componentDidMount() {
    const {slice} = this.props;
    if (slice)
      this.setState({
        text: this.state.text.slice(slice[0], slice[1])
      })
  }
  render() {
    return (
    <Row>
      <Col md='4' lg='4'>
          <div className="centered background-light-blue kpmp-color-dark">
              <div>
                  <span className="font-size-three-rem">117</span>
              </div>
              <div>
                  <span className="font-size-one-one-half-rem">CKD</span>
              </div>
          </div>
      </Col>
      <Col md='4' lg='4'>
          <div className="centered background-light-blue kpmp-color-dark">
              <div>
                  <span className="font-size-three-rem">43</span>
              </div>
              <div>
                  <span className="font-size-one-one-half-rem">AKI</span>
              </div>
          </div>
      </Col>
      <Col md='4' lg='4'>
          <div className="centered background-light-blue kpmp-color-dark">
              <div>
                  <span className="font-size-three-rem">33</span>
              </div>
              <div>
                  <span className="font-size-one-one-half-rem">REFERENCE</span>
              </div>
          </div>
      </Col>
  </Row>
    );
  }
}
export default ParticipantSummary;