import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import DataTypeSelectorContainer from './DataTypeSelectorContainer';
import ExpressionXCellType from "../ExpressionTables/ExpressionXCellType";
import ExpressionXTissueType from "../ExpressionTables/ExpressionXTissueType";

class SNRNASeq extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    render() {
        return (
            <div>
                <Container className='mt-3 rounded border p-3'>
                    <DataTypeSelectorContainer/>
                </Container>
                <Container className='mt-3 rounded border p-3'>
                    <Row xs='12'>
                        <Col md='6' className='mb-4'>
                            <h5>UMAP</h5>
                            <hr/>
                            <img src='img/umap_placeholder_color.png' className='img-fluid'/>
                        </Col>
                        <Col md='6' className='mb-4'>
                            <h5>AQP Expression</h5>
                            <hr/>
                            <img src='img/umap_placeholder_gradient.png' className='img-fluid'/>
                        </Col>
                    </Row>
                    <ExpressionXCellType/>
                    <ExpressionXTissueType/>
                </Container>
            </div>
        )
    }
}

export default SNRNASeq;