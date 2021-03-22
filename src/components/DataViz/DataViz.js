import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import DataTypeSelectorContainer from './DataTypeSelectorContainer';
import ExpressionXCellType from "../ExpressionTables/ExpressionXCellType";
import UMAPPlot from '../Plots/UMAPPlot'
import {fetchUMAPPoints, fetchGeneExpression} from "../../helpers/ApolloClient";


class DataViz extends Component {
    constructor(props) {
        super(props);
        this.state = { umapRefData: [], plotData: [], geneExpressionData: []};
    };

    componentDidMount() {
        fetchUMAPPoints(this.props.dataType).then(
            (umapRefData) => this.setState({umapRefData: umapRefData}),
            (error) => {
                this.setState({umapRefData: []});
                console.log("There was a problem getting the data: " + error)
            }
        );
        fetchGeneExpression(this.props.dataType, this.props.tissueType, this.props.selectedConcept.value).then(
            (geneExpressionData) => this.setState({geneExpressionData: geneExpressionData}),
            (error) => {
                this.setState({geneExpressionData: []});
                console.log("There was a problem getting the data: " + error)
            }
        );
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
                            <UMAPPlot data={this.state.umapRefData} />
                        </Col>
                        <Col lg='6' className="text-center">
                            <UMAPPlot data={[]} />
                        </Col>
                    </Row>
                    <ExpressionXCellType data={this.state.geneExpressionData} selectedConcept={this.props.selectedConcept} tissueType={this.props.tissueType}/>
                </Container>
            </div>
        )
    }
}

export default DataViz;