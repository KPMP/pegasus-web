import React, { Component } from 'react';
import { Container, Row, Col, Button, ButtonGroup } from 'reactstrap';
import DataTypeSelectorContainer from './DataTypeSelectorContainer';
import { formatTissueType } from "../../helpers/Utils";
import LMDDotPlot from "../Plots/LMDDotPlot";
import { fetchRegionalTranscriptomics } from "../../helpers/ApolloClient";
import RegionalTranscriptomicsTable from "../ExpressionTables/RegionalTranscriptomicsTable";
import { CSVLink } from "react-csv";
import { formatDataType } from "../../helpers/Utils";
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';
import { faDownload, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class RegionalViz extends Component {
    constructor(props) {
        super(props);
        this.state = { rtAllPlotData: [], rtAllTableData: [], rtGTPlotData: [], rtGTTableData: [], selectedComparison: 'all_segments', selectedPlot: 'box' };
        if (!this.props.tissueType) {
            this.props.setTissueType('all')
        }
        props.setDataType('rt');
    };

    componentDidMount() {
        if (this.props.gene.symbol) {
            this.getRTData();
        }
    };

    componentDidUpdate(prevProps, prevState, snapShot) {
        if (this.props.tissueType !== prevProps.tissueType) {
            this.setState({ rtAllTableData: this.state.rtAllPlotData[this.props.tissueType] });
            this.setState({ rtGTTableData: this.state.rtGTPlotData[this.props.tissueType] });
        }
        if (this.props.gene !== prevProps.gene) {
            this.getRTData();
        }
    };

    getRTData = () => {
        fetchRegionalTranscriptomics('all_segments', this.props.gene.symbol).then((result) => {
            this.setState({ rtAllPlotData: result });
            this.setState({ rtAllTableData: result[this.props.tissueType] });
        }
        );
        fetchRegionalTranscriptomics('glom_tub', this.props.gene.symbol).then((result) => {
            this.setState({ rtGTPlotData: result })
            this.setState({ rtGTTableData: result[this.props.tissueType] });
        }
        );
    };

    getExportFilename = () => {
        const grouping = this.state.selectedComparison === 'glom_tub' ? 'GlomVsTI' : 'Regions';
        const tissueType = formatTissueType(this.props.tissueType).toLowerCase().replace(" ", "-");
        return "KPMP_" + formatDataType(this.props.dataType) + '_gene-comparison_' + this.props.gene.symbol + '_' + tissueType + '_' + grouping + '.csv';
    };

    cleanResults = (results) => {
        // This next line was needed to avoid a strange error complaining that I couldn't modify the array
        let tempResults = JSON.parse(JSON.stringify(results));
        // The order b - a is important here because we want a reverse sort
        let sortedResults = tempResults.sort(function (a, b) { return b.foldChange - a.foldChange; });
        return sortedResults.map(({ segment, segmentName, pVal, stdDev, foldChange, sampleCount }) => {
            return {
                abbr: segment,
                region: segmentName,
                numSamples: sampleCount,
                stdDeviation: stdDev,
                foldChange: foldChange ? foldChange : "NS",
                pVal: (pVal || pVal === 0) ? pVal : "NS",
            }
        });
    };

    render() {
        let plot = {};
        let table = {};
        let downloadData = [];
        let cleanDownloadData = [];
        if (this.state.selectedComparison === 'glom_tub') {
            table = <RegionalTranscriptomicsTable data={this.state.rtGTTableData} />;
            plot = <LMDDotPlot data={this.state.rtGTPlotData} />
            downloadData = this.state.rtGTTableData;
        } else {
            table = <RegionalTranscriptomicsTable data={this.state.rtAllTableData} />;
            plot = <LMDDotPlot data={this.state.rtAllPlotData} />
            downloadData = this.state.rtAllTableData;
        }

        if (downloadData && downloadData.length > 0) {
            cleanDownloadData = this.cleanResults(downloadData);
        }
        return (
            <Container id='outer-wrapper'>
                <DataTypeSelectorContainer />
                {!this.props.gene.symbol ?
                    <Container className='mt-3 rounded border p-3 shadow-sm mb-5'>
                        <div className="regional-search-copy">
                            <Row xs='12'>
                                <Col lg={{ size: 1, offset: 4 }}>
                                    <FontAwesomeIcon className={"fa fa-share"} icon={faShare} />
                                </Col>
                                <Col lg='7'>
                                    <h6>Gene Expression:</h6>
                                    <p>Enter a gene above to get started</p>
                                </Col>
                            </Row>
                        </div>
                    </Container >
                    : <Container className='mt-3 rounded border p-3 shadow-sm mb-5'>
                        <Row xs='12'>
                            <Col lg='12'>
                                <h5>{this.props.gene.symbol} expression comparison across regions in {formatTissueType(this.props.tissueType)}</h5>
                            <hr />
                            </Col>
                        </Row>
                        <Row xs='12'>
                            <Col lg='12' className='text-left lmd-plot-toggle'>
                                <span className='d-table-cell pr-4 pb-2 text-nowrap'>Display by: </span>
                                <span className='d-table-cell'>
                                    <ButtonGroup>
                                        <Button color="primary" onClick={() => this.setState({ selectedComparison: 'all_segments' })} active={this.state.selectedComparison === 'all_segments'}>Regions</Button>
                                        <Button color="primary" onClick={() => this.setState({ selectedComparison: 'glom_tub' })} active={this.state.selectedComparison === 'glom_tub'}>Glom vs Tubulo-interstitium</Button>
                                    </ButtonGroup>
                                </span>
                            </Col>
                        </Row>
                        <Row xs='12' className='mb-4 lmd-plot-container'>
                            {plot}
                            <hr />
                        </Row>
                        <Row cs='12' className='mb-4 footnote'>
                          <Col>
                            <small>
                              The comparisons in the plot and data table were performed across different segments in the same condition. The plot data should be read and interpreted following the horizontal guides. The fold change and significance of a segment are related to the average expression of all segments in the same condition. Due to the experiment design, it is not possible to draw direct comparisons in the same segment across conditions.
                            </small>
                          </Col>
                        </Row>
                        <Row xs='12'>
                            <Col lg='11'>
                                <h5>{this.props.gene.symbol} expression comparison across regions in {formatTissueType(this.props.tissueType)}</h5>
                                <h6>NS = Not Significant</h6>
                            </Col>
                            <Col xs='1' className='text-right'>
                                <CSVLink
                                    onClick={() => handleGoogleAnalyticsEvent('Download', this.getExportFilename())}
                                    data={cleanDownloadData}
                                    filename={this.getExportFilename()}
                                    target="_blank"
                                    className="text-body icon-container"
                                >
                                    <FontAwesomeIcon icon={faDownload} />
                                </CSVLink>
                            </Col>
                        </Row>
                        <Row xs='12'>
                            {table}
                        </Row>
                    </Container>
                }
            </Container>
        )
    }
}

export default RegionalViz;
