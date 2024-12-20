import React, { Component } from 'react';
import { Grid, TableColumnResizing, TableHeaderRow, 
    Table, TableSummaryRow, TableBandHeader} from '@devexpress/dx-react-grid-bootstrap4';
import { Col, Row, UncontrolledTooltip, Spinner } from "reactstrap";
import { formatEnrollmentCategory, formatNumberToPrecision } from "../../helpers/Utils"
import { CSVLink } from "react-csv";
import { faDownload, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDataType } from "../../helpers/Utils";
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';
import Parser from 'html-react-parser';
import { stripHtml } from "string-strip-html";
import {
    SummaryState,
    IntegratedSummary,
  } from '@devexpress/dx-react-grid';


class ExpressionXCellType extends Component {

    getExportFilename = () => {
        const enrollmentCategory = formatEnrollmentCategory(this.props.enrollmentCategory).toLowerCase().replace(" ", "-");
        return "KPMP_" + formatDataType(this.props.dataType) + '-seq_gene-comparison_' + this.props.gene + '_' + enrollmentCategory + '.csv';
    };

    cleanResults = (results) => {
        return results.filter((result) => result.clusterName !== "TOTAL CELLS: ")
            .map(({ cluster, foldChange, pVal, pValAdj, clusterName, cellCount, pct1, avgExp }) => {
                let pct1Value = (pct1 > 0) ? (pct1 * 100) : pct1;
                return {
                    clusterAbbrev: cluster,
                    clusterName: clusterName,
                    cellCount: cellCount ? cellCount : 0,
                    meanExp: formatNumberToPrecision(avgExp, 3, false, this.props.dataType, this.props.enrollmentCategory),
                    pctCellsExpressing: formatNumberToPrecision(pct1Value, 3, false, this.props.dataType, this.props.enrollmentCategory),
                    foldChange: formatNumberToPrecision(foldChange, 3, false, this.props.dataType, this.props.enrollmentCategory),
                    pVal: formatNumberToPrecision(pVal, 3, false, this.props.dataType, this.props.enrollmentCategory),
                    pValAdj: formatNumberToPrecision(pValAdj, 3, false, this.props.dataType, this.props.enrollmentCategory)
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

    parseClusterName = (row) => {
        let value = row.clusterName;
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
            },
            {
                title: <span>CELL CLUSTER (<i>predicted state</i>)</span>,
                name: 'clusterName',
                getCellValue: row => this.parseClusterName(row)
                
            },
            {
                title: <span># CELLS IN<br />CELL CLUSTER</span>,
                name: 'cellCount',
                getCellValue: row => row.cellCount ? row.cellCount : 0
            },
            {
                title: <span>MEAN<br />EXPRESSION <span className="icon-info"><FontAwesomeIcon className='kpmp-light-blue' id='mean-expression-info' icon={faInfoCircle} /></span>
                    <UncontrolledTooltip placement='bottom' target='mean-expression-info' >
                        Averaged expression values (logarithmic) for each cell cluster
                    </UncontrolledTooltip></span>,
                name: 'avgExp',
                getCellValue: row => formatNumberToPrecision(row.avgExp, 3, false, this.props.dataType, this.props.enrollmentCategory)
            },
            {
                title: <span>% CELLS<br />EXPRESSING</span>,
                name: 'pct1',
                getCellValue: row => {
                    let newValue = (row.pct1 > 0) ? (row.pct1 * 100) : row.pct1;
                    return formatNumberToPrecision(newValue, 3, false, this.props.dataType, this.props.enrollmentCategory);
                }
            },
            {
                title: <span>FOLD<br />CHANGE <span className="icon-info"><FontAwesomeIcon className='kpmp-light-blue' id='fold-change-info' icon={faInfoCircle} /></span>
                    <UncontrolledTooltip placement='bottom' target='fold-change-info' >
                        Log fold-change of the average expression between this cell cluster and all others. Positive values indicate that the feature is more highly expressed in this cell cluster.
                    </UncontrolledTooltip></span>,
                name: 'foldChange',
                getCellValue: row => formatNumberToPrecision(row.foldChange, 3, false, this.props.dataType, this.props.enrollmentCategory)
            },
            {
                title: <span>P VALUE <span className="icon-info"><FontAwesomeIcon className='kpmp-light-blue' id='pvalue-info' icon={faInfoCircle} /></span>
                    <UncontrolledTooltip placement='bottom' target='pvalue-info' >
                        p-value (unadjusted)
                    </UncontrolledTooltip></span>,
                name: 'pVal',
                getCellValue: row => formatNumberToPrecision(row.pVal, 3, false, this.props.dataType, this.props.enrollmentCategory)
            },
            {
                title: <span>ADJ<br />P VALUE <span className="icon-info"><FontAwesomeIcon id='pvalue-adj-info' className='kpmp-light-blue' icon={faInfoCircle} /></span>
                    <UncontrolledTooltip placement='bottom' target='pvalue-adj-info' >
                        Adjusted p-value, based on bonferroni correction using all features in the dataset.
                    </UncontrolledTooltip></span>,
                name: 'pValAdj',
                getCellValue: row => formatNumberToPrecision(row.pValAdj, 3, false, this.props.dataType, this.props.enrollmentCategory)
            }
        ]
    };

    getColumnExtensions() {

        return [
            { columnName: 'cluster', align: 'left'},
            { columnName: 'clusterName', align: 'left'},
            { columnName: 'cellCount', align: 'left' },
            { columnName: 'avgExp', align: 'left' },
            { columnName: 'pct1', align: 'left' },
            { columnName: 'foldChange', align: 'left' },
            { columnName: 'pVal', align: 'left' },
            { columnName: 'pValAdj', align: 'left' },
        ]
    }

    getDefaultColumnWidths () {
        return [
            { columnName: 'cluster', width: 106},
            { columnName: 'clusterName', width: 500},
            { columnName: 'cellCount', width: 110 },
            { columnName: 'avgExp', width: 125 },
            { columnName: 'pct1', width: 106 },
            { columnName: 'foldChange', width: 100 },
            { columnName: 'pVal', width: 106 },
            { columnName: 'pValAdj', width: 100 },
        ]
    }

    getColumnBands() {
        return [
            { 
                title: "CELL CLUSTER VS ALL OTHERS",
                children: [
                    { columnName: 'foldChange'},
                    { columnName: 'pVal' },
                    { columnName: 'pValAdj',}
                ]
            }
        ];
    }


    render() {
        const BandCell = ({ children, tableRow, tableColumn, column, ...restProps }) => {
            return (
                <TableBandHeader.Cell {...restProps} column={column} 
                    className="text-center cluster_v_others cluster_v_others_container">
                    {children}
                </TableBandHeader.Cell>
            )
        }
        if (this.props.isLoading) {
            return (
                <div className='viz-spinner text-center'>
                    <Spinner color='primary' />
                </div>
            )
        } else if (this.props.data.length === 0) {
            return (<div></div>)
        } else {
            const totalSummaryItems = [ 
                { columnName: 'cellCount', type: 'sum' }
            ]
            return (
                <React.Fragment>
                    <Row xs='12' className='mt-5'>
                        <Col xs='11'>
                            <h5><span>{this.props.gene}</span> Expression Comparison across Cell Clusters in {formatEnrollmentCategory(this.props.enrollmentCategory)}</h5>
                            <h6>NS = Not Significant { (this.props.dataType === "sn" && this.props.enrollmentCategory === "dmr") && "|  - = Not Calculated" }</h6>
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
                    <Row xs='12' id='expression-by-cell-type'>
                        <Col xs='12'>
                            <React.Fragment>
                                <Grid rows={this.props.data} columns={this.getColumns()}>
                                    <SummaryState totalItems={totalSummaryItems}/>
                                    <IntegratedSummary />
                                    <Table columnExtensions={this.getColumnExtensions()}/>
                                    <TableColumnResizing defaultColumnWidths={this.getDefaultColumnWidths()} minColumnWidth={100}/>
                                    <TableHeaderRow/>
                                    <TableBandHeader columnBands={this.getColumnBands()} cellComponent={BandCell}/>
                                    <TableSummaryRow />
                                </Grid>
                            </React.Fragment>
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
                            {this.props.dataType === "sn" ? 
                            <small>
                              For more information about the cell type, cluster, and state definitions, see the following publication: <a target="_blank" rel="noreferrer" href="https://rdcu.be/dx5m9">Nature 619, 585–594 (2023)</a> and <a target="_blank" rel='noreferrer' href="https://github.com/KPMP/Cell-State-Atlas-2022/">GitHub pipelines</a>
                          </small> :
                          <small>
                          For more information about the cell type, cluster, and state definitions, see the following publication: <a target="_blank" rel="noreferrer" href="https://rdcu.be/dx5m9">Nature 619, 585–594 (2023)</a>
                          </small>
                          }
                        </Col>
                    </Row>
                </React.Fragment>
            )
        }
    }
}

export default ExpressionXCellType;
