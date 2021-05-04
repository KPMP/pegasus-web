import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import DataTypeSelectorContainer from './DataTypeSelectorContainer';
import ExpressionXCellType from "../ExpressionTables/ExpressionXCellType";
import UMAPPlot from '../Plots/UMAPPlot';
import FeaturePlot from '../Plots/FeaturePlot';
import { fetchGeneExpression, fetchPlotlyData } from "../../helpers/ApolloClient";
import {sum} from "../../helpers/Utils";


class DataViz extends Component {
    constructor(props) {
        super(props);
        this.state = { plotData: [], geneExpressionData: []};
    };

    cleanResults = (results) => {
        return results.filter((result) => result.clusterName !== "TOTAL CELLS: ");
    };

    componentDidMount() {
        this.getGeneExpression(this.props.dataType, this.props.gene.symbol, "", this.props.tissueType);
        this.getUmapPoints(this.props.dataType, this.props.gene.symbol, this.props.tissueType);
    }

    componentDidUpdate(prevProps) {
        if (this.props.tissueType !== prevProps.tissueType || this.props.dataType !== prevProps.dataType) {
            this.setState({ plotData:[], geneExpressionData:[]});
            this.getGeneExpression(this.props.dataType, this.props.gene.symbol, "", this.props.tissueType);
            this.getUmapPoints(this.props.dataType, this.props.gene.symbol, this.props.tissueType);
        }
    }

    getGeneExpression = async (dataType, gene, cellType, tissueType) => {
        const results = await fetchGeneExpression(dataType, gene, cellType, tissueType);
        const cleanResults = this.cleanResults(results);
        cleanResults.push({clusterName: "TOTAL CELLS: ", cellCount: sum(results, "cellCount")});
        this.setState({geneExpressionData: cleanResults});
    }

    getUmapPoints = async (dataType, gene, tissueType) => {
        const results = await fetchPlotlyData(dataType, gene, tissueType);
        this.setState({plotData: results});
    };

    render() {
        return (
            <Container id='outer-wrapper'>
                <DataTypeSelectorContainer/>
                <Container className='mt-3 rounded border p-3 shadow-sm mb-5'>
                    <Row xs='12'>
                        <Col lg='6'>
                            <h5>Reference UMAP</h5>
                            <hr/>
                        </Col>
                        <Col lg='6'>
                            <h5>{this.props.gene.symbol} Expression</h5>
                            <hr/>
                        </Col>
                    </Row>
                    <Row xs='12' className='mb-4'>
                        <Col lg='6' className="text-center">
                            <UMAPPlot data={this.state.plotData} dataType={this.props.dataType} tissueType={this.props.tissueType}/>
                        </Col>
                        <Col lg='6' className="text-center">
                            <FeaturePlot data={this.state.plotData} dataType={this.props.dataType} gene={this.props.gene.symbol} tissueType={this.props.tissueType}/>
                        </Col>
                    </Row>
                    <ExpressionXCellType dataType={this.props.dataType} data={this.state.geneExpressionData} gene={this.props.gene.symbol} tissueType={this.props.tissueType}/>
                </Container>
            </Container>
        )
    }
}

export default DataViz;