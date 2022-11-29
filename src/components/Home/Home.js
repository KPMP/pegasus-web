import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import DataSummary from './DataSummary';
import TopContent from './TopContent';
import LeftContent from './LeftContent';

class Home extends Component {
  render() {
    document.title = 'Kidney Tissue Atlas'
    return (
      <article id="homepage">
        <Row>
          <Col md='12' lg='12'>
            <TopContent />
          </Col>
          <Col md='12' lg='4'>
            <LeftContent />
          </Col>
          <Col md='12' lg='8'>
            <DataSummary history={this.props.history} />
          </Col>
        </Row>
      </article>
    );
  }
}

export default Home;
