import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import DataTypeSelectorContainer from './DataTypeSelectorContainer';
import ExpressionXCellType from "../ExpressionTables/ExpressionXCellType";
import UMAPPlot from '../Plots/UMAPPlot';
import FeaturePlot from '../Plots/FeaturePlot';
import { fetchGeneExpression, fetchPlotlyData } from "../../helpers/ApolloClient";
import { getDataTypeOptions } from "../../helpers/Utils";
import queryString from 'query-string';

class RNASeqViz extends Component {
    constructor(props) {
        super(props);
        this.state = { prevPath: '', plotData: [], geneExpressionData: [], isLoading: true, isLoadingUmap: true };

        const queryParam = queryString.parse(props.location.search);
        if (queryParam && queryParam.dataType) {
            props.resetState();
            props.setDataType(queryParam.dataType);
            window.open(props.location.pathname, '_self');
            this.setState({isLoading: false, isLoadingUmap: false})
        }
        
    };

    cleanResults = (results) => {
        return results.filter((result) => result.clusterName !== "TOTAL CELLS: ");
    };

    async componentDidMount() {
        const queryParam = queryString.parse(this.props.location.search);
        if (this.props.gene.symbol !== undefined && this.props.gene.symbol !== '' && (!queryParam || !queryParam.dataType)) {
            await this.fetchDataType(this.props.gene.symbol)
            if (!this.props.enrollmentCategory) {
                this.props.setEnrollmentCategory('all')
            }
            if (this.props.dataType) {
                this.getGeneExpression(this.props.dataType, this.props.gene.symbol, "", this.props.enrollmentCategory, 'network-only');
                this.getUmapPoints(this.props.dataType, this.props.gene.symbol, this.props.enrollmentCategory, 'network-only');
            }
        } else {
            this.setState({ isLoading: false, isLoadingUmap: false })
        }
    }

    async componentDidUpdate(prevProps) {
        if (this.props.enrollmentCategory !== prevProps.enrollmentCategory
            || this.props.dataType !== prevProps.dataType
            || this.props.gene.symbol !== prevProps.gene.symbol) {
            if (this.props.gene.symbol && this.props.dataType) {
                this.setState({ plotData: [], geneExpressionData: [], isLoading: true, isLoadingUmap: true });
                if (!this.props.enrollmentCategory) {
                    this.props.setEnrollmentCategory('all')
                }
                this.getGeneExpression(this.props.dataType, this.props.gene.symbol, "", this.props.enrollmentCategory);
                this.getUmapPoints(this.props.dataType, this.props.gene.symbol, this.props.enrollmentCategory);
            }
        }
    }

    fetchDataType = async (geneSymbol) => {
        this.setState({ isLoading: true });
        let options = await getDataTypeOptions(this.props.gene.symbol, "");
        let availableOption = options.find((e) => {
            if (!this.props.dataType) {
                if (e.isDisabled === false && (e.value === 'sc' || e.value === 'sn')) {
                    return e;
                }
            } else {
                if (e.isDisabled === false && (e.value === this.props.dataType)) {
                    return e;
                }
            }
            return null;
        });
        if (availableOption) {
            this.props.setDataType(availableOption.value)
            return availableOption.value
        }
    }

    getGeneExpression = async (dataType, gene, cellType, enrollmentCategory, fetchPolicy) => {
        const results = await fetchGeneExpression(dataType, gene, cellType, enrollmentCategory, fetchPolicy);
        const cleanResults = this.cleanResults(results);
        this.setState({ geneExpressionData: cleanResults, isLoading: false });
    }

    getUmapPoints = async (dataType, gene, enrollmentCategory, fetchPolicy) => {
        const results = await fetchPlotlyData(dataType, gene, enrollmentCategory, fetchPolicy);
        this.setState({ plotData: results, isLoadingUmap: false });
    };

    render() {
        return (
            <div className='height-wrapper mb-3'>
            <Container id='outer-wrapper'>
                <DataTypeSelectorContainer isLoadingUmap={this.state.isLoadingUmap} />
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
                                    <UMAPPlot data={this.state.plotData} dataType={this.props.dataType ? this.props.dataType : 'sc'} enrollmentCategory={this.props.enrollmentCategory} />
                                </Col>
                            </Row>
                        </Col>

                        <Col lg='6'>
                            <Row xs='12' className='mb-4'>
                                <Col lg='12'>
                                    <div className={(this.props.gene.symbol) ? 'featurePlot-title' : 'featurePlot-title-hidden'}><h5>{this.props.gene.symbol} Expression</h5><hr /></div>
                                </Col>
                            </Row>
                            <Row className={(!this.state.isLoadingUmap && !this.props.gene.symbol && this.state.plotData.length >= 0) ? 'featurePlot-loader-background' : ''}>
                                <Col lg='12' className="featurePlot-container">
                                    <FeaturePlot data={this.state.plotData} dataType={this.props.dataType} isLoading={this.state.isLoadingUmap} gene={this.props.gene.symbol} enrollmentCategory={this.props.enrollmentCategory} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {(!this.state.isLoading && this.state.geneExpressionData.length > 0) && <hr />}
                        </Col>
                    </Row>
                    <ExpressionXCellType dataType={this.props.dataType} data={this.state.geneExpressionData} isLoading={this.state.isLoading} gene={this.props.gene.symbol} enrollmentCategory={this.props.enrollmentCategory} />
                </Container>
            </Container>
            </div>
        )
    }
}

export default RNASeqViz;
