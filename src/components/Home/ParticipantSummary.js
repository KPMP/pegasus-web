import React, { Component } from 'react';
import {Row, Col } from 'reactstrap';
import { fetchTissueTypeSummaryCounts } from '../../helpers/ApolloClient';
class ParticipantSummary extends Component {
  constructor(props) {
      super(props);
      this.state = { akiCount: [], ckdCount: [], hrtCount:[]};
    }
  componentDidMount() {
    if(this.props.tissueType){
      this.getTissueCounts();
    }
  };

  // componentDidUpdate(prevProps){
  //   if(this.props.tissueType !== prevProps.tissueType){
  //     this.setState({akiCount: this.state.akiCount[this.props.tissueType]})
  //     this.setState({akiCount: this.state.ckdCount[this.props.tissueType]})
  //     this.setState({akiCount: this.state.hrtCount[this.props.tissueType]})
  //   }
  // };

  getTissueCounts = () => {
    fetchTissueTypeSummaryCounts(this.props.tissueType).then((result) => {
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