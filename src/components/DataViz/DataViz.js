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

    componentDidMount() {
        fetchPlotlyData(this.props.dataType, this.props.selectedConcept.value,this.props.tissueType).then(
            (plotData) => this.setState({plotData: plotData}),
            (error) => {
                this.setState({plotData: []});
                console.log("There was a problem getting the data: " + error)
            }
        );
        fetchGeneExpression(this.props.dataType, this.props.selectedConcept.value, "", this.props.tissueType).then(
            (geneExpressionData) => {
                geneExpressionData.push({
                    clusterName: "TOTAL CELLS: ",
                    cellCount: sum(geneExpressionData, "cellCount")
                });
                this.setState({geneExpressionData: geneExpressionData})
            },
            (error) => {
                this.setState({geneExpressionData: []});
                console.log("There was a problem getting the data: " + error)
            }
        );
    }

    componentDidUpdate(prevProps) {
        if (this.props.tissueType !== prevProps.tissueType || this.props.dataType !== prevProps.dataType) {
            console.log("component updated");
            this.setState({ plotData:[], geneExpressionData:[]});
            this.getGeneExpression(this.props.dataType, this.props.selectedConcept.value, "", this.props.tissueType);
            this.getUmapPoints(this.props.dataType, this.props.selectedConcept.value, this.props.tissueType);
        }
    }

    getGeneExpression = async (dataType, selectedConcept, cellType, tissueType) => {
        const results = await fetchGeneExpression(dataType, selectedConcept, cellType, tissueType);
        results.push({clusterName: "TOTAL CELLS: ", cellCount: sum(results, "cellCount")});
        this.setState({geneExpressionData: results});
    }

    getUmapPoints = async (dataType, selectedConcept, tissueType) => {
        const results = await fetchPlotlyData(dataType, selectedConcept, tissueType);
        this.setState({plotData: results});
    };

    render() {
        return (
            <div>
                <Container className='mt-3 rounded border p-3 shadow-sm mb-5'>
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
                            <UMAPPlot data={this.state.plotData}/>
                        </Col>
                        <Col lg='6' className="text-center">
                            <FeaturePlot data={this.state.plotData} />
                        </Col>
                    </Row>
                    <ExpressionXCellType data={this.state.geneExpressionData} selectedConcept={this.props.selectedConcept} tissueType={this.props.tissueType}/>
                </Container>
            </div>
        )
    }
}

export default DataViz;