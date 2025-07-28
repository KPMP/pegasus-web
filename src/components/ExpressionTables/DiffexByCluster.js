import React, { Component } from 'react';
import { AgGridReact } from "ag-grid-react";
import { Col, Row, Container, Spinner, UncontrolledTooltip } from 'reactstrap';
import { formatNumberToPrecision, formatDataType } from '../../helpers/Utils'
import { fetchGeneExpression, fetchRegionalTranscriptomicsByStructure, fetchRegionalProteomicsByStructure } from '../../helpers/ApolloClient';
import { CSVLink } from 'react-csv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import DiffexInfoBar from './DiffexInfoBar';
import packageJson from '../../../package.json';
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';

const CustomHeader = (props) => {
     return (
         <div className='ag-header-cell-text' style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
             <span>{props.displayName}</span>
             <FontAwesomeIcon className='kpmp-light-blue' icon={faCircleInfo} style={{ marginLeft: '5px' }} />
         </div>
     );
 };



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

    getAccessionLink = (gene, accession) => {
        return <button onClick={() => this.handleClick(gene, accession)} type='button' className='table-column btn btn-link text-start p-0'>{accession}</button>
    }

    getGeneLink = (gene) => {
        return <button onClick={() => this.handleClick(gene)} type='button' className='table-column btn btn-link text-start p-0'>{gene}</button>
    };


    
    getColumns = () => {

        let columns = [];
        if (this.props.dataType === 'rp') {
            columns.push(
                {
                    headerName: 'PROTEIN',
                    field: 'accession',
                    // align: 'left',
                    // width: "15%",
                    // headerStyle: { fontSize: "15px" },
                    // cellStyle: { fontSize: '14px', padding: "2px" },
                    valueFormatter: params => this.getAccessionLink(params.gene, params.accession)
                }
            );
        } else {
            columns.push(
                {
                    headerName: 'GENE',
                    field: 'gene',
                    // align: 'left',
                    // width: "15%",
                    // headerStyle: { fontSize: "15px" },
                    // cellStyle: { fontSize: '14px', padding: "2px" },
                    valueFormatter: params => this.getGeneLink(params.gene)
                }
            );
        }
        columns.push(
            {
                headerName: 'FOLD CHANGE',
                headerComponent: CustomHeader,
                headerTooltip: 'Fold change of a gene is calculated by dividing the average expression of the gene in the segment/cluster of interest by its average expression in all other segments/clusters being compared.',
                field: 'foldChange',
                // align: 'right',
                // width: "15%",
                sortable: true, defaultSort: 'desc',
                // headerStyle: { fontSize: '15px', textAlign: 'center' },
                // cellStyle: {
                //     fontSize: '14px',
                //     padding: '2px',
                //     textAlign: 'center'
                // },
                // type: 'numeric',
                valueFormatter: params => formatNumberToPrecision(params.foldChange, 3)
            }
        );
        if (this.props.dataType !== 'rp') {
            columns.push(
                {
                    headerName: 'P VALUE',
                    headerComponent: CustomHeader,
                    headerTooltip: 'P value was calculated using a Wilcoxon rank sum test between the expression of the gene in the segment/cluster of interest and its expression in all other segments/clusters.',
                    field: 'pVal',
                    // align: 'right',
                    // width: "15%",
                    sortable: true,
                    // type: 'numeric',
                    // headerStyle: { fontSize: '15px', textAlign: 'right' },
                    // cellStyle: { fontSize: '14px', padding: '2px', textAlign: 'right' },
                    valueFormatter: params => formatNumberToPrecision(params.pVal, 3)
                }
            );
        }
        columns.push(
            {
                headerName: <span>ADJ P VALUE</span>,
                field: 'pValAdj',
                // align: 'right',
                // width: "15%",
                sortable: true,
                // type: 'numeric',
                // headerStyle: { fontSize: '15px', textAlign: 'right' },
                // cellStyle: { fontSize: '14px', padding: '2px', textAlign: 'right' },
                valeuFormatter: params => formatNumberToPrecision(params.pValAdj, 3, true)
            },
            {
                headerName: 'hidden',
                field: 'hidden',
                sortable: false,
                // width: "40%",
                className: "diffex-hidden-column",
                // headerStyle: { fontSize: '15px', textAlign: 'center', color: "rgba(0,0,0,0)" },
                // cellStyle: { fontSize: '14px', padding: '2px', textAlign: 'center', color: "rgba(0,0,0,0)" },
            }
        );
        return columns
    }

    handleClick = (gene, accession) => {
        this.props.setGene({ symbol: gene, name: '' }, this.props.dataType);
        this.props.setAccession(accession);
    };

    getExportFilename = () => {
        return 'KPMP_' + formatDataType(this.props.dataType) + '-diffex_' + this.props.cluster + '_all-samples.csv';
    };

    cleanResults = (results, dataType) => {
      if (dataType === "rp"){
        return results.map(({ accession, foldChange, pValAdj }) => {
          return {
              protein: accession,
              foldChange: formatNumberToPrecision(foldChange, 3),
              pValAdj: formatNumberToPrecision(pValAdj, 3, true)
          }
        });
      }
      else {
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
                                                <AgGridReact
                                                    rowData={this.state.diffexData}
                                                    columnDefs={this.getColumns()}
                                                    showGrid={true}
                                                    domLayout='autoHeight'
                                                    // options={{
                                                    //     tableLayout: 'fixed',
                                                    //     thirdSortClick: false,
                                                    //     pageSize: 20,
                                                    //     pageSizeOptions: [],
                                                    //     rowStyle: row => {
                                                    //         let style = {
                                                    //             padding: '1px'
                                                    //         };
                                                    //         return style;
                                                    //     }
                                                    // }}
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
