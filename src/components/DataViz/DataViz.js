import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import DataTypeSelectorContainer from './DataTypeSelectorContainer';
import ExpressionXCellType from "../ExpressionTables/ExpressionXCellType";
import Papa from "papaparse";
import rawData from '../../tsneData.tsv';
import UMAPPlot from '../Plots/UMAPPlot'
import { fetchGeneExpression } from "../../helpers/ApolloClient";


class DataViz extends Component {
    constructor(props) {
        super(props);
        this.state = { plotData: [], geneExpressionData: []};
    };

    componentDidMount() {
        fetchGeneExpression(this.props.dataType, this.props.tissueType, this.props.selectedConcept.value).then(
            (geneExpressionData) => this.setState({geneExpressionData: geneExpressionData}),
            (error) => {
                this.setState({geneExpressionData: []});
                console.log("There was a problem getting the data: " + error)
            }
        );
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
                <Container className='mt-3 rounded border p-3 shadow-sm'>
                    <DataTypeSelectorContainer/>
                    <Row xs='12'>
                        <Col lg='6'>
                            <h5>UMAP</h5>
                            <hr/>
                        </Col>
                        <Col lg='6'>
                            <h5>{this.props.selectedConcept.value} Expression</h5>
                            <hr/>
                        </Col>
                    </Row>
                    <Row xs='12' className='mb-4'>
                        <Col lg='6' className="text-center">
                            <UMAPPlot data={this.state.plotData} />
                        </Col>
                        <Col lg='6' className="text-center">
                            <UMAPPlot data={this.state.plotData} />
                        </Col>
                    </Row>
                    <ExpressionXCellType data={this.state.geneExpressionData} selectedConcept={this.props.selectedConcept} tissueType={this.props.tissueType}/>
                </Container>
            </div>
        )
    }
}

export default DataViz;