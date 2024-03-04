import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { Col, Row, Container, Spinner, UncontrolledTooltip } from 'reactstrap';
import { formatNumberToPrecision, formatDataType } from '../../helpers/Utils'
import { fetchGeneExpression, fetchRegionalTranscriptomicsByStructure, fetchRegionalProteomicsByStructure } from '../../helpers/ApolloClient';
import { CSVLink } from 'react-csv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import DiffexInfoBar from './DiffexInfoBar';
import packageJson from '../../../package.json';
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';

class DiffexByCluster extends Component {

    constructor(props) {
        super(props);
        this.state = {
            diffexData: [], isLoading: true
        };
    };

    componentDidMount() {
        this.fetchGeneExpression();
    }

    fetchGeneExpression = () => {
        if (this.props.dataType === 'rt') {
            fetchRegionalTranscriptomicsByStructure(this.props.cluster).then(
                (geneExpressionData) => {
                    this.setState({diffexData: geneExpressionData, isLoading: false})
                },
                (error) => {
                    this.setState({diffexData: []});
                    console.log('There was a problem getting the data: ' + error)
                }
            );
        } else if (this.props.dataType === 'rp') {
            fetchRegionalProteomicsByStructure(this.props.cluster).then(
                (geneExpressionData) => {
                    this.setState({ diffexData: geneExpressionData, isLoading: false })
                },
                (error) => {
                    this.setState({ diffexData: [] });
                    console.log('There was a problem getting the data: ' + error)
                }
            );
        } else {
            fetchGeneExpression(this.props.dataType, '', this.props.cluster, 'all').then(
                (geneExpressionData) => {
                    this.setState({ diffexData: geneExpressionData, isLoading: false })
                },
                (error) => {
                    this.setState({ diffexData: [] });
                    console.log('There was a problem getting the data: ' + error)
                }
            );
        };
    };

    componentDidUpdate(prevProps) {
        if (this.props.dataType !== prevProps.dataType) {
            this.setState({ diffexData: [], isLoading: true });
            this.fetchGeneExpression();
        }
    }

    getGeneLink = (gene) => {
        return <button onClick={() => this.handleClick(gene)} type='button' className='table-column btn btn-link text-start p-0'>{gene}</button>
    };

    getColumns = () => {
        let columns = [];
        columns.push(
            {
                title: 'GENE',
                field: 'gene',
                align: 'left',
                width: "15%",
                headerStyle: { fontSize: "11px" },
                cellStyle: { fontSize: '14px', padding: "2px" },
                render: rowData => this.getGeneLink(rowData.gene)
            },
            {
                title: <span>FOLD CHANGE <span className="icon-info"><FontAwesomeIcon className='kpmp-light-blue' id='fold-change-info' icon={faInfoCircle} /></span>
                <UncontrolledTooltip placement='bottom' target='fold-change-info' >
                    Fold change of a gene is calculated by dividing the average expression of the gene in the segment/cluster of interest by its average expression in all other segments/clusters being compared.
                </UncontrolledTooltip></span>,
                field: 'foldChange',
                align: 'right',
                width: "15%",
                sorting: true, defaultSort: 'desc',
                headerStyle: { fontSize: '15px', textAlign: 'center' },
                cellStyle: {
                    fontSize: '14px',
                    padding: '2px',
                    textAlign: 'center'
                },
                type: 'numeric',
                render: rowData => formatNumberToPrecision(rowData.foldChange, 3)
            }
        );
        if (this.props.dataType !== 'rp') {
            columns.push(
                {
                    title: <span>P VALUE <span className="icon-info"><FontAwesomeIcon className='kpmp-light-blue' id='pvalue-info' icon={faInfoCircle} /></span>
                <UncontrolledTooltip placement='bottom' target='pvalue-info' >
                    P value was calculated using a Wilcoxon rank sum test between the expression of the gene in the segment/cluster of interest and its expression in all other segments/clusters.
                </UncontrolledTooltip></span>,
                    field: 'pVal',
                    align: 'right',
                    width: "15%",
                    sorting: true,
                    type: 'numeric',
                    headerStyle: { fontSize: '15px', textAlign: 'right' },
                    cellStyle: { fontSize: '14px', padding: '2px', textAlign: 'right' },
                    render: rowData => formatNumberToPrecision(rowData.pVal, 3)
                }
            );
        }
        columns.push(
            {
                title: <span>ADJ P VALUE <span className="icon-info"><FontAwesomeIcon id='pvalue-adj-info' className='kpmp-light-blue' icon={faInfoCircle} /></span>
                <UncontrolledTooltip placement='bottom' target='pvalue-adj-info' >
                    Adjusted p-value, based on bonferroni correction using all features in the dataset.
                </UncontrolledTooltip></span>,
                field: 'pValAdj',
                align: 'right',
                width: "15%",
                sorting: true,
                type: 'numeric',
                headerStyle: { fontSize: '15px', textAlign: 'right' },
                cellStyle: { fontSize: '14px', padding: '2px', textAlign: 'right' },
                render: rowData => formatNumberToPrecision(rowData.pValAdj, 3, true)
            },
            {
                title: 'hidden',
                field: 'hidden',
                sorting: false,
                width: "40%",
                className: "diffex-hidden-column",
                headerStyle: { fontSize: '15px', textAlign: 'center', color: "rgba(0,0,0,0)" },
                cellStyle: { fontSize: '14px', padding: '2px', textAlign: 'center', color: "rgba(0,0,0,0)" },
            }
        );
        return columns
    }

    handleClick = (gene) => {
        this.props.setGene({ symbol: gene, name: '' }, this.props.dataType);
    };

    getExportFilename = () => {
        return 'KPMP_' + formatDataType(this.props.dataType) + '-diffex_' + this.props.cluster + '_all-samples.csv';
    };

    cleanResults = (results, dataType) => {
      if (dataType === "rp"){
        return results.map(({ gene, foldChange, pValAdj }) => {
          return {
              gene: gene,
              foldChange: formatNumberToPrecision(foldChange, 3),
              pValAdj: formatNumberToPrecision(pValAdj, 3, true)
          }
        });
      }
      else if (dataType === "rt"){
        return results.map(({ gene, foldChange, pVal, pValAdj }) => {
          return {
              gene: gene,
              foldChange: formatNumberToPrecision(foldChange, 3),
              pVal: formatNumberToPrecision(pVal, 3),
              pValAdj: formatNumberToPrecision(pValAdj, 3, true)
          }
      });
      }
    };

    render() {
        return (
            <div className='height-wrapper mb-3 mt-3'>
                <Container id='outer-wrapper'>
                    <DiffexInfoBar cluster={this.props.cluster} dataType={this.props.dataType} setDataType={this.props.setDataType} />
                    <Container className='rounded border p-3 shadow-sm mb-5'>
                        {
                            this.state.isLoading ?
                                <div className='diffex-spinner text-center'>
                                    <Spinner color='primary' />
                                </div>
                                :
                                <React.Fragment>
                                    <Row xs='12'>
                                        <Col xs='12' className='text-end'>
                                            <CSVLink
                                                onClick={() => handleGoogleAnalyticsEvent('Explorer', 'Download', this.getExportFilename())}
                                                data={this.cleanResults(this.state.diffexData, this.props.dataType)}
                                                filename={this.getExportFilename()}
                                                target='_blank'
                                                className='text-body icon-container'
                                            >
                                                <FontAwesomeIcon icon={faDownload} />
                                            </CSVLink>
                                        </Col>
                                    </Row>
                                    <Row xs='12' id="diffexTable">
                                        <Col xs='12'>
                                            {(
                                                process.env.NODE_ENV !== 'development' ||
                                                packageJson.displayMaterialTable
                                            ) &&
                                                <MaterialTable
                                                    data={this.state.diffexData}
                                                    title=''
                                                    columns={this.getColumns()}
                                                    options={{
                                                        tableLayout: 'fixed',
                                                        thirdSortClick: false,
                                                        pageSize: 20,
                                                        pageSizeOptions: [],
                                                        rowStyle: row => {
                                                            let style = {
                                                                padding: '1px'
                                                            };
                                                            return style;
                                                        }
                                                    }}
                                                />
                                            }
                                        </Col>
                                    </Row>
                                </React.Fragment>
                        }
                        { this.props.dataType === 'rt' ? 
                            <Row>
                                <Col lg='12' className='text-start small'>
                                    NOTE: Results limited to the first 1000 based on highest fold change.
                                </Col>
                            </Row> :
                            ""
                        }
                    </Container>
                </Container>
            </div>
        )
    }
}

export default DiffexByCluster;
