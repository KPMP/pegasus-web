import React, {Component} from "react";
import { Row, Col } from 'reactstrap';
import ConceptSelectContainer from "./ConceptSelectContainer";

class ConceptSelectFullWidth extends Component {

    render() {
        return (
            <React.Fragment>
                <Row xs="12">
                    <Col>
                        <h5>Search</h5>
                    </Col>
                </Row>
                <Row xs="12">
                    <Col>
                        <ConceptSelectContainer {...this.props}/>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default ConceptSelectFullWidth;