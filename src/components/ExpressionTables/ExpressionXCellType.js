import React, {Component} from 'react';
import ReactTable from "react-table";
import { Col, Row, UncontrolledTooltip, Spinner } from "reactstrap";
import { formatTissueType, formatNumberToPrecision } from "../../helpers/Utils"
import { CSVLink } from "react-csv";
import { faDownload, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDataType } from "../../helpers/Utils";


class ExpressionXCellType extends Component {

    getExportFilename = () => {
        const tissueType = formatTissueType(this.props.tissueType).toLowerCase().replace(" ", "-");
        return "KPMP_" + formatDataType(this.props.dataType) + '-seq_gene-comparison_' + this.props.gene + '_' + tissueType + '.csv';
    };

    cleanResults = (results) => {
        return results.filter((result) => result.clusterName !== "TOTAL CELLS: ")
            .map(({cluster, foldChange, pVal, pValAdj, clusterName, cellCount, pct1, avgExp}) => {
                return {
                    clusterAbbrev: cluster,
                    clusterName: clusterName,
                    cellCount: cellCount?cellCount:0,
                    medianExp: avgExp,
                    pctCellsExpressing: pct1,
                    foldChange: foldChange,
                    pVal: pVal,
                    pValAdj: pValAdj
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

    getColumns = () => {
        return [
            {
                Header: "ABBR",
                accessor: 'cluster',
                id: 'cluster',
                headerClassName: 'table-header',
                className: 'table-column'
            },
            {
                Header: "CLUSTER",
                accessor: 'clusterName',
                headerClassName: 'table-header',
                className: 'table-column',
                minWidth: 280,
                Cell: ({ value }) => <span title={value}>{value}</span>
            },
            {
                Header: <span># CELLS IN<br/>CLUSTER</span>,
                accessor: 'cellCount',
                headerClassName: 'table-header',
                className: 'table-column',
                Cell: ({ value }) => value?value:0
            },
            {
                Header: <span>MEDIAN<br/>EXPRESSION</span>,
                accessor: 'avgExp',
                headerClassName: 'table-header',
                className: 'table-column',
                Cell: ({ value }) => formatNumberToPrecision(value, 3)
            },
            {
                Header: <span>% CELLS<br/>EXPRESSING</span>,
                accessor: 'pct1',
                headerClassName: 'table-header',
                className: 'table-column',
                Cell: ({ value }) => formatNumberToPrecision(value * 100, 3)
            },
            {
                Header: <span>FOLD<br/>CHANGE <span className="icon-info"><FontAwesomeIcon className='kpmp-light-blue' id='fold-change-info' icon={faInfoCircle} /></span>
             
                        <UncontrolledTooltip placement='bottom' target='fold-change-info' >
                            Log fold-change of the average expression between this cluster and all others. Positive values indicate that the feature is more highly expressed in this cluster.
                        </UncontrolledTooltip></span>,
                headerClassName: 'table-header',
                className: 'table-column',
                accessor: 'foldChange',
                Cell: ({ value }) => formatNumberToPrecision(value, 3)
            },
            {
                Header: <span>P VALUE <span className="icon-info"><FontAwesomeIcon className='kpmp-light-blue' id='pvalue-info' icon={faInfoCircle} /></span>
                            <UncontrolledTooltip placement='bottom' target='pvalue-info' >
                                p-value (unadjusted)
                            </UncontrolledTooltip></span>,
                headerClassName: 'table-header',
                className: 'table-column',
                accessor: 'pVal',
                Cell: ({ value }) => formatNumberToPrecision(value, 3)
            },
            {
                Header: <span>ADJ<br/>P VALUE <span className="icon-info"><FontAwesomeIcon id='pvalue-adj-info' className='kpmp-light-blue' icon={faInfoCircle} /></span>
                            <UncontrolledTooltip placement='bottom' target='pvalue-adj-info' >
                                Adjusted p-value, based on bonferroni correction using all features in the dataset.
                            </UncontrolledTooltip></span>,
                headerClassName: 'table-header',
                className: 'table-column',
                accessor: 'pValAdj',
                Cell: ({ value }) => formatNumberToPrecision(value, 3)
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
        } else {
            return (
                <React.Fragment>
                    <Row xs='12' className='mt-5'>
                        <Col xs='11'>
                            <h5><span>{this.props.gene}</span> Expression Comparison across Clusters in {formatTissueType(this.props.tissueType)}</h5>
                        </Col>
                        <Col xs='1' className='text-right'>
                            <CSVLink
                                data={this.cleanResults(this.props.data)}
                                filename={this.getExportFilename()}
                                target="_blank"
                                className="text-body icon-container"
                            >
                                <FontAwesomeIcon icon={faDownload} />
                            </CSVLink>
                        </Col>
                    </Row>
                    <Row xs='12'>
                        <Col xs={{ size: 4, offset: 8 }} className='d-flex justify-content-center'><span id="cluster_v_others">CLUSTER VS ALL OTHERS</span></Col>
                    </Row>
                    <Row xs='12'>
                        <Col sm={{ size: 4, offset: 8 }}><hr/></Col>
                    </Row>
                    <Row xs='12'>
                        <Col xs='12'>
                            <ReactTable
                                style={{border: 'none'}}
                                data={this.props.data}
                                ref={this.reactTable}
                                sortable={false}
                                columns={this.getColumns()}
                                className='-striped expression-table'
                                showPagination={false}
                                noDataText={'No data found'}
                                minRows={this.props.data.length}
                                getTrProps={this.getTrProps}
                                defaultPageSize={100}
                            />
                        </Col>
                    </Row>
                </React.Fragment>
            )
        }
    }
}

export default ExpressionXCellType;