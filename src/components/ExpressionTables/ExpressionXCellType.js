import React, { Component } from 'react';
import { Grid, TableFixedColumns, TableHeaderRow, Table} from '@devexpress/dx-react-grid-bootstrap4';
import { Col, Row, UncontrolledTooltip, Spinner } from "reactstrap";
import { formatTissueType, formatNumberToPrecision } from "../../helpers/Utils"
import { CSVLink } from "react-csv";
import { faDownload, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { sum } from "../../helpers/Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDataType } from "../../helpers/Utils";
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';
import Parser from 'html-react-parser';
import { stripHtml } from "string-strip-html";

class ExpressionXCellType extends Component {

    getExportFilename = () => {
        const tissueType = formatTissueType(this.props.tissueType).toLowerCase().replace(" ", "-");
        return "KPMP_" + formatDataType(this.props.dataType) + '-seq_gene-comparison_' + this.props.gene + '_' + tissueType + '.csv';
    };

    cleanResults = (results) => {
        return results.filter((result) => result.clusterName !== "TOTAL CELLS: ")
            .map(({ cluster, foldChange, pVal, pValAdj, clusterName, cellCount, pct1, avgExp }) => {
                return {
                    clusterAbbrev: cluster,
                    clusterName: clusterName,
                    cellCount: cellCount ? cellCount : "NS",
                    medianExp: avgExp ? pct1 : "NS",
                    pctCellsExpressing: pct1 ? pct1 : "NS",
                    foldChange: foldChange ? foldChange : "NS",
                    pVal: (pVal || pVal === 0) ? pVal : "NS",
                    pValAdj: (pValAdj || pValAdj) === 0 ? pValAdj : "NS"
                }
            });
    };

    getTrProps = (state, rowInfo, instance) => {
        if (rowInfo && rowInfo.row.clusterName === "TOTAL CELLS: ") {
            return {
                id: "total-row"
            }
        }
        return {};
    };

    parseClusterName = (value) => {
        console.log(value)
        if (value !== null) {
            const regex = /<sup>*.<\/sup>/i;
            let titleVal = stripHtml(value.replace(regex, '')).result
                .replace('( ', '(')
                .replace(' )', ')');
            return <span title={titleVal}>{Parser(value)}</span>
        } else {
            return ''
        }
    };

    getColumns = () => {
        return [
            {
                title: "ABBR",
                name: 'cluster',
                // id: 'cluster',
                // headerClassName: 'table-header',
                // className: 'table-column',
                // minWidth: 90,
            },
            {
                title: <span>CLUSTER (<i>predicted state</i>)</span>,
                // Footer: "TOTAL CELLS: ",
                name: 'clusterName',
                // headerClassName: 'table-header',
                // className: 'table-column',
                // minWidth: 465,
                getCellValue: row => this.parseClusterName(row)
                
            },
            {
                title: <span># CELLS IN<br />CLUSTER</span>,
                name: 'cellCount',
                // headerClassName: 'table-header',
                // className: 'table-column',
                // minWidth: 90,
                // Footer: (sum(this.props.data, "cellCount")),
                getCellValue: row => row ? row : 0
            },
            {
                title: <span>MEAN<br />EXPRESSION <span className="icon-info"><FontAwesomeIcon className='kpmp-light-blue' id='mean-expression-info' icon={faInfoCircle} /></span>
                    <UncontrolledTooltip placement='bottom' target='mean-expression-info' >
                        Averaged expression values (logarithmic) for each cluster
                    </UncontrolledTooltip></span>,
                name: 'avgExp',
                // headerClassName: 'table-header',
                // className: 'table-column',
                // minWidth: 90,
                getCellValue: row => formatNumberToPrecision(row, 3)
            },
            {
                title: <span>% CELLS<br />EXPRESSING</span>,
                name: 'pct1',
                // headerClassName: 'table-header',
                // className: 'table-column',
                // minWidth: 90,
                getCellValue: row => {
                    let newValue = (row > 0) ? (row * 100) : row;
                    return formatNumberToPrecision(newValue, 3);
                }
            },
            {
                title: <span>FOLD<br />CHANGE <span className="icon-info"><FontAwesomeIcon className='kpmp-light-blue' id='fold-change-info' icon={faInfoCircle} /></span>

                    <UncontrolledTooltip placement='bottom' target='fold-change-info' >
                        Log fold-change of the average expression between this cluster and all others. Positive values indicate that the feature is more highly expressed in this cluster.
                    </UncontrolledTooltip></span>,
                // headerClassName: 'table-header',
                // className: 'table-column',
                name: 'foldChange',
                // minWidth: 75,
                getCellValue: row => formatNumberToPrecision(row, 3)
            },
            {
                title: <span>P VALUE <span className="icon-info"><FontAwesomeIcon className='kpmp-light-blue' id='pvalue-info' icon={faInfoCircle} /></span>
                    <UncontrolledTooltip placement='bottom' target='pvalue-info' >
                        p-value (unadjusted)
                    </UncontrolledTooltip></span>,
                // headerClassName: 'table-header',
                // className: 'table-column',
                name: 'pVal',
                // minWidth: 90,
                getCellValue: row => formatNumberToPrecision(row, 3)
            },
            {
                title: <span>ADJ<br />P VALUE <span className="icon-info"><FontAwesomeIcon id='pvalue-adj-info' className='kpmp-light-blue' icon={faInfoCircle} /></span>
                    <UncontrolledTooltip placement='bottom' target='pvalue-adj-info' >
                        Adjusted p-value, based on bonferroni correction using all features in the dataset.
                    </UncontrolledTooltip></span>,
                // headerClassName: 'table-header',
                // className: 'table-column',
                name: 'pValAdj',
                // minWidth: 85,
                getCellValue: row => formatNumberToPrecision(row, 3)
            }
        ]
    };

    render() {
        if (this.props.isLoading) {
            return (
                <div className='viz-spinner text-center'>
                    <Spinner color='primary' />
                </div>
            )
        } else if (this.props.data.length === 0) {
            return (<div></div>)
        } else {
            return (
                <React.Fragment>
                    <Row xs='12' className='mt-5'>
                        <Col xs='11'>
                            <h5><span>{this.props.gene}</span> Expression Comparison across Clusters in {formatTissueType(this.props.tissueType)}</h5>
                            <h6>NS = Not Significant</h6>
                        </Col>
                        <Col xs='1' className='text-end'>
                            <CSVLink
                                onClick={() => handleGoogleAnalyticsEvent('Explorer', 'Download', this.getExportFilename())}
                                data={this.cleanResults(this.props.data)}
                                filename={this.getExportFilename()}
                                target="_blank"
                                className="text-body icon-container"
                            >
                                <FontAwesomeIcon icon={faDownload} />
                            </CSVLink>
                        </Col>
                    </Row>
                    <Row xs='12' className="cluster_v_others_container-offset-fix">
                        <Col xs={{ size: 4, offset: 8 }} className='d-flex justify-content-center cluster_v_others_container'>
                            <span id="cluster_v_others">CLUSTER VS ALL OTHERS
                            </span></Col>
                    </Row>
                    <Row xs='12'>
                        <Col xs='12'>
                            <Grid rows={this.props.data} columns={this.getColumns()}>
                                <Table/>
                                <TableHeaderRow/>
                                <TableFixedColumns/>
                            </Grid>
                        </Col>
                    </Row>
                    <Row xs='12'>
                        <Col><small>
                            <sup>1</sup>adaptive/maladaptive/repairing: Represented by cells that retain differentiation markers of reference states, albeit at lower levels, but also show expression of known injury associated genes, mesenchymal markers or factors promoting inflammation or fibrosis. &nbsp;
                            <sup>2</sup>cycling: Represented by enrichment of cell cycle genes. &nbsp;
                            <sup>3</sup>degenerative: Marked loss of differentiation markers, and/or increased %ERT, %MT, and/or marked decrease in genes detected. These cells could represent an early injury state or cells that will not recover function. &nbsp;
                            <sup>4</sup>transitional: Represented by an intermediate state showing markers of cells sharing the same parental lineage. &nbsp;
                        </small>
                            <p></p>
                            <small>
                                For more information about the cell type, cluster, and state definitions, see the following pre-print: <a target="_blank" rel="noreferrer" href="https://www.biorxiv.org/content/10.1101/2021.07.28.454201v1">https://www.biorxiv.org/content/10.1101/2021.07.28.454201v1</a>
                            </small>
                        </Col>
                    </Row>
                </React.Fragment>
            )
        }
    }
}

export default ExpressionXCellType;