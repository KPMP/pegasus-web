import React, { Component } from 'react';
import {Card, CardBody, CardTitle, CardText, Row, Col, Container} from 'reactstrap';

class WelcomeText extends Component {
    render() {
        return (
            <Container className="mt-3 rounded border p-3">
                <Row><Col><p><h5>Welcome to the Kidney Tissue Atlas Explorer</h5></p></Col></Row>
                <Row><Col><p>Lorem ipsum yadda yadda yadda</p></Col></Row>
                <Row><Col><p><a href='/'>Learn more about our data types and methodologies</a></p></Col></Row>
            </Container>
        );
    }
}

export default WelcomeText;