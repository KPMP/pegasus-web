import React, {Component} from 'react';
import { Container, Row, Col, Button, ButtonGroup } from 'reactstrap';
import DataTypeSelectorContainer from './DataTypeSelectorContainer';
import {formatTissueType, sum} from "../../helpers/Utils";
import LMDDotPlot from "../Plots/LMDDotPlot";
import LMDBoxPlot from "../Plots/LMDBoxPlot";
import {fetchRegionalTranscriptomics} from "../../helpers/ApolloClient";
import RegionalTranscriptomicsTable from "../ExpressionTables/RegionalTranscriptomicsTable";


class RegionalViz extends Component {
    constructor(props) {
        super(props);
        this.state = { rtAllPlotData: [], rtAllTableData: [], rtGTPlotData: [], rtGTTableData: [], selectedComparison: 'all_segments', selectedPlot: 'box'};
        if (!this.props.tissueType) {
            this.props.setTissueType('all')
        }
    };

    componentDidMount() {
        this.getRTData();
    };

    componentDidUpdate(prevProps, prevState, snapShot) {
        if (this.props.tissueType !== prevProps.tissueType) {
            this.setState({rtAllTableData: this.state.rtAllPlotData[this.props.tissueType]});
            this.setState({rtGTTableData: this.state.rtGTPlotData[this.props.tissueType]});
        }
        if (this.props.gene !== prevProps.gene) {
            this.getRTData();
        }
    };

    getRTData = () => {
        fetchRegionalTranscriptomics('all_segments', this.props.gene.symbol).then((result) => {
                this.setState({rtAllPlotData: result});
                this.setState({rtAllTableData: result[this.props.tissueType]});
            }
        );
        fetchRegionalTranscriptomics('glom_tub', this.props.gene.symbol).then((result) => {
                this.setState({rtGTPlotData: result})
                this.setState({rtGTTableData: result[this.props.tissueType]});
            }
        );
    }

    render() {
        let plot = this.state.selectedPlot === 'dot'?<LMDDotPlot/>:<LMDBoxPlot/>;
        let table = this.state.selectedComparison === 'glom_tub'?
            <RegionalTranscriptomicsTable data={this.state.rtGTTableData}/>:
            <RegionalTranscriptomicsTable data={this.state.rtAllTableData}/>;
        return (
            <Container id='outer-wrapper'>
                <DataTypeSelectorContainer/>
                <Container className='mt-3 rounded border p-3 shadow-sm mb-5'>
                    <Row xs='12'>
                        <Col lg='12'>
                            <h5>{this.props.gene.symbol} Expression</h5>
                            <hr/>
                        </Col>
                    </Row>
                    <Row xs='12' className='mb-4'>
                        <Col lg='3'>
                            <span className='d-table-cell pr-2 pb-2 text-nowrap'>Display by: </span>
                            <ButtonGroup>
                                <Button color="primary" onClick={() => this.setState({selectedComparison: 'all_segments'})} active={this.state.selectedComparison === 'all_segments'}>Regions</Button>
                                <Button color="primary" onClick={() => this.setState({selectedComparison: 'glom_tub'})} active={this.state.selectedComparison === 'glom_tub'}>Glom vs TI</Button>
                            </ButtonGroup>
                        </Col>
                        <Col lg='3'>
                            <span className='d-table-cell pr-2 pb-2 text-nowrap'>Visualization: </span>
                            <ButtonGroup>
                                <Button color="primary" onClick={() => this.setState({selectedPlot: 'box'})} active={this.state.selectedPlot === 'box'}>Box plot</Button>
                                <Button color="primary" onClick={() => this.setState({selectedPlot: 'dot'})} active={this.state.selectedPlot === 'dot'}>Dot plot</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                    <Row xs='12' className='mb-4'>
                        <Col lg='12' className="text-center">
                            {plot}
                            <hr/>
                        </Col>
                    </Row>
                    <Row xs='12'>
                        <Col lg='12'>
                            <h5>{this.props.gene.symbol} expression comparison across regions in {formatTissueType(this.props.tissueType)}</h5>
                        </Col>
                        <Col lg='12'>
                            {table}
                        </Col>
                    </Row>
                </Container>
            </Container>
        )
    }
}

export default RegionalViz;