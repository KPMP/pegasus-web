import React, { Component } from 'react';
import {Row, Col } from 'reactstrap';
import { fetchTissueTypeSummaryCounts } from '../../helpers/ApolloClient';
class ParticipantSummary extends Component {
  constructor(props) {
      super(props);
      this.state = { akiCount: [], ckdCount: [], hrtCount:[]};
    }
    async componentDidMount() {
      console.log(await this.getTissueCounts());
  };

  getTissueCounts = () => {
    fetchTissueTypeSummaryCounts().then((result) => {
      this.setState({akiCount: result.akiCount})
      this.setState({ckdCount: result.ckdCount})
      this.setState({hrtCount: result.hrtCount})
    })
  }
  render() {
    return (
    <Row>
      <Col md='4' lg='4'>
          <div className="centered background-light-blue kpmp-color-dark">
              <div>
                  <span className="font-size-three-rem">{this.state.ckdCount}</span>
              </div>
              <div>
                  <span className="font-size-one-one-half-rem">CKD</span>
              </div>
          </div>
      </Col>
      <Col md='4' lg='4'>
          <div className="centered background-light-blue kpmp-color-dark">
              <div>
                  <span className="font-size-three-rem">{this.state.akiCount}</span>
              </div>
              <div>
                  <span className="font-size-one-one-half-rem">AKI</span>
              </div>
          </div>
      </Col>
      <Col md='4' lg='4'>
          <div className="centered background-light-blue kpmp-color-dark">
              <div>
                  <span className="font-size-three-rem">{this.state.hrtCount}</span>
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