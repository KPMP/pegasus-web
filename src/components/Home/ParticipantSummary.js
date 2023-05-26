import React, { Component } from 'react';
import {Row, Col, UncontrolledTooltip } from 'reactstrap';
import { fetchTissueTypeSummaryCounts } from '../../helpers/ApolloClient';
class ParticipantSummary extends Component {
  constructor(props) {
      super(props);
      this.state = { akiCount: [], ckdCount: [], hrtCount:[], resistorCount:[]};
    }
    async componentDidMount() {
      await this.getTissueCounts();
  };

  getTissueCounts = () => {
    fetchTissueTypeSummaryCounts().then((result) => {
      this.setState({akiCount: result.akiCount})
      this.setState({ckdCount: result.ckdCount})
      this.setState({hrtCount: result.hrtCount})
      this.setState({resistorCount: result.resistorCount})
    })
  }
  render() {
    return (
    <Row>
      <Col md='3' lg='3'>
          <div className="centered background-light-blue kpmp-color-dark">
              <div>
                  <span className="font-size-three-rem">{this.state.ckdCount}</span>
              </div>
              <div>
                <span className="participant-summary-tooltips">
                    <span 
                        className="font-size-one-one-half-rem" 
                        id="CKDSummary">
                            CKD
                    </span>
                    <UncontrolledTooltip
                        placement="bottom"
                        target="CKDSummary">
                            Chronic Kidney Disease
                    </UncontrolledTooltip>
                </span>
              </div>
          </div>
      </Col>
      <Col md='3' lg='3'>
          <div className="centered background-light-blue kpmp-color-dark">
              <div>
                  <span className="font-size-three-rem">{this.state.akiCount}</span>
              </div>
              <div>
                <span className="participant-summary-tooltips">
                    <span 
                        className="font-size-one-one-half-rem"
                        id="AKISummary">
                            AKI
                    </span>
                    <UncontrolledTooltip
                        placement="bottom"
                        target="AKISummary">
                            Acute Kidney Injury
                    </UncontrolledTooltip>
                </span>
              </div>
          </div>
      </Col>
        <Col md='3' lg='3'>
            <div className="centered background-light-blue kpmp-color-dark">
                <div>
                    <span className="font-size-three-rem">{this.state.resistorCount}</span>
                </div>
                <div>
                    <span className="participant-summary-tooltips">
                        <span 
                            className="font-size-one-one-half-rem"
                            id="DMRSummary">
                                DM-R
                        </span>
                        <UncontrolledTooltip
                            placement="bottom"
                            target="DMRSummary">
                                Diabetes Mellitus - Resilient
                        </UncontrolledTooltip>
                    </span>
                </div>
            </div>
        </Col>
      <Col md='3' lg='3'>
          <div className="centered background-light-blue kpmp-color-dark">
              <div>
                  <span className="font-size-three-rem">{this.state.hrtCount}</span>
              </div>
              <div>
                    <span className="participant-summary-tooltips">
                        <span 
                            className="font-size-one-one-half-rem"
                            id="ReferenceSummary">
                                REFERENCE
                        </span>
                        <UncontrolledTooltip
                            placement="bottom"
                            target="ReferenceSummary">
                                Healthy Reference
                        </UncontrolledTooltip>
                    </span>
              </div>
          </div>
      </Col>
  </Row>
    );
  }
}
export default ParticipantSummary;