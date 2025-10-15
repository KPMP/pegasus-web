import React, { Component } from 'react';
import { Col, Row, Spinner } from "reactstrap";
import { formatEnrollmentCategory, formatNumberToPrecision } from "../../helpers/Utils"
import { CSVLink } from "react-csv";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDataType } from "../../helpers/Utils";
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';
import Parser from 'html-react-parser';
import { stripHtml } from "string-strip-html";
import { AgGridReact } from "ag-grid-react";
import InfoHeader from './InfoHeader';
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([ AllCommunityModule ]);


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
                headerName: "",
                headerStyle: { backgroundColor: "#ffffffff" },
                headerClass: 'dataVizTableHeader',
                resizable: false,
                children: [
                    {
                        headerName: "ABBR",
                        field: 'cluster',
                        width: 106,
                        headerClass: 'dataVizTableHeader'
                    },
                    {
                        headerName: "CELL CLUSTER (predicted state)",
                        headerComponent: InfoHeader,
                        headerComponentParams: { infoIcon: false },
                        field: 'clusterName',
                        wrapHeaderText: true,
                        cellRenderer: row => this.parseClusterName(row.value),
                        width: 420,
                        headerClass: 'dataVizTableHeader',
                        sortable: true
                        
                    },
                    {
                        headerName: "# CELLS IN CELL CLUSTER",
                        wrapHeaderText: true,
                        field: 'cellCount',
                        valueFormatter: row => row.value ? row.value : 0,
                        width: 130,
                        headerClass: 'dataVizTableHeader'
                    },
                    {
                        headerName: 'MEAN EXPRESSION',
                        headerComponent: InfoHeader,
                        headerComponentParams: { infoIcon: true },
                        wrapHeaderText: true,
                        headerTooltip: 'Averaged expression values (logarithmic) for each cell cluster',
                        field: 'avgExp',
                        valueFormatter: row => {
                            if (row.data?.isTotal) return '';
                            return formatNumberToPrecision(row.value, 3, false, this.props.dataType, this.props.enrollmentCategory);
                        },
                        width: 125,
                        headerClass: 'dataVizTableHeader'
                    },
                    {
                        headerName: '% CELLS EXPRESSING',
                        field: 'pct1',
                        wrapHeaderText: true,
                         valueFormatter: row => {
                            if (row.data?.isTotal) return '';
                            let newValue = (row.value > 0) ? (row.value * 100) : row.value;
                            return formatNumberToPrecision(newValue, 3, false, this.props.dataType, this.props.enrollmentCategory);
                        },
                        width: 128,
                        headerClass: 'dataVizTableHeader'
                    }
                ]
            },
            {
                headerName: "CELL CLUSTER VS ALL OTHERS",
                headerStyle: { backgroundColor: "#cee5ff" },
                headerClass: 'dataVizTableHeader',
                children: [
                    {
                        headerName: 'FOLD CHANGE', 
                        headerComponent: InfoHeader,
                        headerComponentParams: { infoIcon: true},
                        wrapHeaderText: true,
                        headerTooltip: 'Log fold-change of the average expression between this cell cluster and all others. Positive values indicate that the feature is more highly expressed in this cell cluster.',
                        field: 'foldChange',
                        valueFormatter: row => {
                            if (row.data?.isTotal) return '';
                            return formatNumberToPrecision(row.value, 3, false, this.props.dataType, this.props.enrollmentCategory);
                        },
                        width: 135,
                        headerClass: 'dataVizTableHeader'
                    },
                    {
                        headerName: 'P VALUE',
                        headerComponent: InfoHeader,
                        headerComponentParams: { infoIcon: true },
                        wrapHeaderText: true,
                        headerTooltip: 'p-value (unadjusted)',
                        field: 'pVal',
                        valueFormatter: row => {
                            if (row.data?.isTotal) return '';
                            return formatNumberToPrecision(row.value, 3, false, this.props.dataType, this.props.enrollmentCategory);
                        },
                        width: 111,
                        headerClass: 'dataVizTableHeader'
                    },
                    {
                        headerName: 'ADJ P VALUE',
                        headerComponent: InfoHeader,
                        headerComponentParams: { infoIcon: true },
                        wrapHeaderText: true,
                        headerTooltip: 'Adjusted p-value, based on bonferroni correction using all features in the dataset.',
                        field: 'pValAdj',
                        valueFormatter: row => {
                            if (row.data?.isTotal) return '';
                            return formatNumberToPrecision(row.value, 3, false, this.props.dataType, this.props.enrollmentCategory);
                        },
                        width: 100,
                        headerClass: 'dataVizTableHeader'
                    }
                ]
            }
            
        ]
    };

    getTotalCells = () => {
        const { data } = this.props;
        const total = data.reduce((sum, row) => {
            const value = Number(row.cellCount);
            return sum + value;
        },0);
        return [
            {
                clusterName: "Total cells:",
                cellCount: total,
                isTotal: true
            },
        ];
    }

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
                                <div className="ag-theme-material img-fluid">
                                    <AgGridReact 
                                        rowData={this.props.data} 
                                        columnDefs={this.getColumns()}
                                        domLayout='autoHeight' 
                                        onGridReady={this.onGridReady} 
                                        autoSizeStrategy={{type: 'fitGridWidth'}} 
                                        headerHeight={45}
                                        groupHeaderHeight={35}
                                        autoHeaderHeight={false}
                                        pinnedBottomRowData={this.getTotalCells()}
                                        getRowClass={params => (params.data?.isTotal ? 'total-row': '')}
                                    />

                                </div>
                            </React.Fragment>
                        </Col>
                    </Row>
                    <Row xs='12'>
                        <Col><small>
                            <sup>1</sup>adaptive/maladaptive: In relation to nephron cell states, these cells are adapting to their altered environment or injury to either undergo recovery or progress to an unresolved or maladaptive epithelial state. These cells may retain differentiation markers of reference states, albeit at lower levels, but also show expression of known injury or repair-associated genes, mesenchymal markers or factors promoting inflammation or fibrosis. For fibroblasts, this may represent an activated state to produce increased matrix or cytokines.<br/>
                            <sup>2</sup>cycling: Represented by enrichment of cell cycle genes.<br/>
                            <sup>3</sup>degenerative: Marked loss of differentiation markers, and/or increased %ERT, %MT, and/or marked decrease in genes detected. These cells could represent an early injury state or cells that will not recover function.<br/>
                            <sup>4</sup>transitional: Represented by an intermediate state showing markers of cells sharing the same parental lineage but may shift functional roles depending on physiological demands.<br/>
                            <sup>5</sup>failed repair: Related to nephron cell states, these are cells that are in advanced states of injury that have adopted a mesenchymal phenotype, lost their canonical functional roles, may have activated factors that attempt to repair but are not able to recover.   These cells may express profibrogenic and immune-modulating factors that result in fibrosis.
                        </small>
                            <p></p>
                            <small>
                              For more information about the cell type, cluster, and state definitions, see the following publication: <a target="_blank" rel="noreferrer" href="https://www.biorxiv.org/content/10.1101/2025.09.26.678707v1">Cellular and Spatial Drivers of Unresolved Injury and Functional Decline in the Human Kidney</a> and <a target="_blank" rel='noreferrer' href="https://github.com/KPMP-Scientific/KPMP-Atlas-v2">the Atlas v2 GitHub</a>
                            </small>
                        </Col>
                    </Row>
                </React.Fragment>
            )
        }
    }
}

export default ExpressionXCellType;
