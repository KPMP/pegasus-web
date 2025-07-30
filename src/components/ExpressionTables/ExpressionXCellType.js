import React, { Component } from 'react';
import { TableBandHeader} from '@devexpress/dx-react-grid-bootstrap4';
import { Col, Row, Spinner } from "reactstrap";
import { formatEnrollmentCategory, formatNumberToPrecision } from "../../helpers/Utils"
import { CSVLink } from "react-csv";
import { faDownload, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDataType } from "../../helpers/Utils";
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';
import Parser from 'html-react-parser';
import { stripHtml } from "string-strip-html";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([ AllCommunityModule ]);


const CustomHeader = (props) => {
     return (
         <div className='ag-header-cell-text' style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
             <span>{props.displayName}</span>
             <FontAwesomeIcon className='kpmp-light-blue' icon={faCircleInfo} style={{ marginLeft: '5px' }} />
         </div>
     );
 };


class ExpressionXCellType extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            columnDefs: this.getColumns(),
            gradApi: null,
            columnApi: null
        };
    };

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

    parseClusterName = (value) => {
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

    
    onGridReady= (params) => {
        this.setState({gridApi: params.api, columnApi: params.columnApi})
        this.state.gridApi.sizeColumnsToFit();
        this.state.gridApi.refreshCells();
    }

    getColumns = () => {
        return [
            {
                headerName: "ABBR",
                field: 'cluster',
                width: 106
            },
            {
                headerComponent: () => (
                    <span>'CELL CLUSTER (<i>predicted state</i>)',</span>
                ),
                field: 'clusterName',
                cellRenderer: row => this.parseClusterName(row.value),
                width: 500
                
            },
            // {
            //     headerName: <span># CELLS IN<br />CELL CLUSTER</span>,
            //     field: 'cellCount',
            //     valueFormatter: row => row.value ? row.value : 0,
            //     width: 110
            // },
            // {
            //     headerName: 'MEAN EXPRESSION',
            //     headerComponent: CustomHeader,
            //     headerTooltip: 'Averaged expression values (logarithmic) for each cell cluster',
            //     field: 'avgExp',
            //     valueFormatter: row => formatNumberToPrecision(row.value, 3, false, this.props.dataType, this.props.enrollmentCategory),
            //     width: 125
            // },
            // {
            //     headerName: '% CELLS EXPRESSING',
            //     field: 'pct1',
            //     valueFormatter: row => {
            //         let newValue = (row.value > 0) ? (row.value * 100) : row.value;
            //         return formatNumberToPrecision(newValue, 3, false, this.props.dataType, this.props.enrollmentCategory);
            //     },
            //     width: 106
            // },
            // {
            //     headerName: 'FOLD CHANGE', 
            //     headerComponent: CustomHeader,
            //     headerTooltip: 'Log fold-change of the average expression between this cell cluster and all others. Positive values indicate that the feature is more highly expressed in this cell cluster.',
            //     field: 'foldChange',
            //     valueFormatter: row => formatNumberToPrecision(row.value, 3, false, this.props.dataType, this.props.enrollmentCategory),
            //     width: 100
            // },
            // {
            //     headerName: 'P VALUE',
            //     headerComponent: CustomHeader,
            //     headerTooltip: 'p-value (unadjusted)',
            //     field: 'pVal',
            //     valueFormatter: row => formatNumberToPrecision(row.value, 3, false, this.props.dataType, this.props.enrollmentCategory),
            //     width: 106
            // },
            // {
            //     headerName: 'ADJ P VALUE',
            //     headerComponent: CustomHeader,
            //     headerTooltip: 'Adjusted p-value, based on bonferroni correction using all features in the dataset.',
            //     field: 'pValAdj',
            //     valueFormatter: row => formatNumberToPrecision(row.value, 3, false, this.props.dataType, this.props.enrollmentCategory),
            //     width: 100
            // }
        ]
    };


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
                                <AgGridReact rowData={this.props.data} columnDefs={this.getColumns()}
                                    domLayout='autoHeight' onGridReady={this.onGridReady}/>
                                    {/* <SummaryState totalItems={totalSummaryItems}/>
                                    <IntegratedSummary />
                                    <Table columnExtensions={this.getColumnExtensions()}/>
                                    <TableColumnResizing defaultColumnWidths={this.getDefaultColumnWidths()} minColumnWidth={100}/>
                                    <TableHeaderRow/>
                                    <TableBandHeader columnBands={this.getColumnBands()} cellComponent={BandCell}/>
                                    <TableSummaryRow /> */}
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
