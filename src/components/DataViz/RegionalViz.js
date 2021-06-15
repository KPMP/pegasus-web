import React, {Component} from 'react';
import { Container, Row, Col, Button, ButtonGroup } from 'reactstrap';
import DataTypeSelectorContainer from './DataTypeSelectorContainer';
import {formatTissueType, sum} from "../../helpers/Utils";
import LMDDotPlot from "../Plots/LMDDotPlot";
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
    };

    render() {
        let plot = {};
        let table = {};
        if (this.state.selectedComparison === 'glom_tub') {
            table = <RegionalTranscriptomicsTable data={this.state.rtGTTableData}/>;
            plot = <LMDDotPlot data={this.state.rtGTPlotData}/>
        } else {
            table = <RegionalTranscriptomicsTable data={this.state.rtAllTableData}/>;
            plot = <LMDDotPlot data={this.state.rtAllPlotData}/>
        }

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
                    <Row xs='12'>
                        <Col lg='12' className='text-left'>
                            <span className='d-table-cell pr-4 pb-2 text-nowrap'>Display by: </span>
                            <span className='d-table-cell'>
                            <ButtonGroup>
                                <Button color="primary" onClick={() => this.setState({selectedComparison: 'all_segments'})} active={this.state.selectedComparison === 'all_segments'}>Regions</Button>
                                <Button color="primary" onClick={() => this.setState({selectedComparison: 'glom_tub'})} active={this.state.selectedComparison === 'glom_tub'}>Glom vs TI</Button>
                            </ButtonGroup>
                            </span>
                        </Col>
                    </Row>
                    <Row xs='12' className='mb-4'>
                            {plot}
                            <hr/>
                    </Row>
                    <Row xs='12'>
                        <Col lg='12'>
                            <h5>{this.props.gene.symbol} expression comparison across regions in {formatTissueType(this.props.tissueType)}</h5>
                        </Col>
                    </Row>
                    <Row xs='12'>
                        {table}
                    </Row>
                </Container>
            </Container>
        )
    }
}

export default RegionalViz;