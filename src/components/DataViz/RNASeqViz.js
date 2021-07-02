import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import DataTypeSelectorContainer from './DataTypeSelectorContainer';
import ExpressionXCellType from "../ExpressionTables/ExpressionXCellType";
import UMAPPlot from '../Plots/UMAPPlot';
import FeaturePlot from '../Plots/FeaturePlot';
import { fetchGeneExpression, fetchPlotlyData } from "../../helpers/ApolloClient";
import { sum } from "../../helpers/Utils";


class RNASeqViz extends Component {
    constructor(props) {
        super(props);
        this.state = { prevPath: '', plotData: [], geneExpressionData: [], isLoading: true, isLoadingUmap: true };
    };

    cleanResults = (results) => {
        return results.filter((result) => result.clusterName !== "TOTAL CELLS: ");
    };

    componentDidMount() {
        console.log('componmentDid?', this.props.gene.symbol)
        if (this.props.gene.symbol) {
            console.log(';eh???ssss')
            this.getGeneExpression(this.props.dataType, this.props.gene.symbol, "", this.props.tissueType, 'network-only');
            this.getUmapPoints(this.props.dataType, this.props.gene.symbol, this.props.tissueType, 'network-only');
        } else {
            this.setState({ isLoading: false, isLoadingUmap: false })
        }
    }

    componentDidUpdate(prevProps) {

        if (this.props.tissueType !== prevProps.tissueType
            || this.props.dataType !== prevProps.dataType
            || this.props.gene.symbol !== prevProps.gene.symbol) {
            this.setState({ plotData: [], geneExpressionData: [], isLoading: false });
            if (this.props.gene.symbol) {
                this.getGeneExpression(this.props.dataType ? this.props.dataType : 'sn', this.props.gene.symbol, "", this.props.tissueType ? this.props.tissueType : 'all');
                this.getUmapPoints(this.props.dataType ? this.props.dataType : 'sn', this.props.gene.symbol, this.props.tissueType ? this.props.tissueType : 'all');
            }
        }
    }

    getGeneExpression = async (dataType, gene, cellType, tissueType, fetchPolicy) => {
        const results = await fetchGeneExpression(dataType, gene, cellType, tissueType, fetchPolicy);
        const cleanResults = this.cleanResults(results);
        cleanResults.push({ clusterName: "TOTAL CELLS: ", cellCount: sum(results, "cellCount") });
        this.setState({ geneExpressionData: cleanResults, isLoading: false });
    }

    getUmapPoints = async (dataType, gene, tissueType, fetchPolicy) => {
        const results = await fetchPlotlyData(dataType, gene, tissueType, fetchPolicy);
        this.setState({ plotData: results, isLoadingUmap: false });
    };

    render() {
        return (
            <Container id='outer-wrapper'>
                <DataTypeSelectorContainer />
                <Container className='mt-3 rounded border p-3 shadow-sm mb-5'>

                    <Row xs='12'>
                        <Col lg='6'>
                            <Row xs='12' className='mb-4'>
                                <Col lg='12'>
                                    <h5>Reference UMAP</h5>
                                    <hr />
                                </Col>
                            </Row>
                            <Row>
                                <Col lg='6' className="umapPlot-container">
                                    <UMAPPlot data={this.state.plotData} dataType={this.props.dataType} tissueType={this.props.tissueType} />
                                </Col>
                            </Row>
                        </Col>

                        <Col lg='6'>
                            <Row xs='12' className='mb-4'>
                                <Col lg='12'>

                                    <div className={(!this.state.isLoadingUmap && this.state.plotData.length > 0) ? 'featurePlot-title' : 'featurePlot-title-hidden'}><h5>{this.props.gene.symbol} Expression</h5><hr /></div>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg='6' className="featurePlot-container">
                                    <FeaturePlot data={this.state.plotData} dataType={this.props.dataType} isLoading={this.state.isLoadingUmap} gene={this.props.gene.symbol} tissueType={this.props.tissueType} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {(!this.state.isLoading && this.state.geneExpressionData.length > 0) && <hr />}
                        </Col>
                    </Row>
                    <ExpressionXCellType dataType={this.props.dataType} data={this.state.geneExpressionData} isLoading={this.state.isLoading} gene={this.props.gene.symbol} tissueType={this.props.tissueType} />
                </Container>
            </Container>
        )
    }
}

export default RNASeqViz;