import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import DataTypeSelectorContainer from './DataTypeSelectorContainer';
import ExpressionXCellType from "../ExpressionTables/ExpressionXCellType";
import ExpressionXTissueType from "../ExpressionTables/ExpressionXTissueType";
import Papa from "papaparse";
import rawData from '../../tsneData.tsv';
import UMAPPlot from '../Plots/UMAPPlot'


class DataViz extends Component {
    constructor(props) {
        super(props);
        this.state = { plotData: []};
    };

    componentDidMount() {
        Papa.parse(rawData, {
            download: true,
            header: true,
            delimiter: '\t',
            complete: (results) => { this.setState({plotData: results.data}) }
        });
    }

    render() {
        return (
            <div>
                <Container className='mt-3 rounded border p-3'>
                    <DataTypeSelectorContainer/>
                    <Row xs='12' className='mb-4'>
                        <Col md='6'>
                            <h5>UMAP</h5>
                            <hr/>
                            <UMAPPlot data={this.state.plotData} />
                        </Col>
                        <Col md='6'>
                            <h5>AQP Expression</h5>
                            <hr/>
                            <UMAPPlot data={this.state.plotData} />
                        </Col>
                    </Row>
                    <ExpressionXCellType/>
                    <ExpressionXTissueType/>
                </Container>
            </div>
        )
    }
}

export default DataViz;