import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardText, Row, Col } from 'reactstrap';

class WelcomeText extends Component {
    render() {
        return (
            <Card>
                <CardBody>
                    <CardTitle tag='h5'>Welcome to the Kidney Tissue Atlas Explorer</CardTitle>
                    <CardText>
                        <Row><Col>Lorem ipsum yadda yadda yadda</Col></Row>
                        <Row><Col><a href='/'>Learn more about our data types and methodologies</a></Col></Row>
                    </CardText>
                </CardBody>
            </Card>
        );
    }
}

export default WelcomeText;