import React, { Component } from 'react';
import { AgGridReact } from "ag-grid-react";
import { Col, Row, Container, Spinner } from 'reactstrap';
import { formatNumberToPrecision, formatDataType } from '../../helpers/Utils'
import { fetchGeneExpression, fetchRegionalTranscriptomicsByStructure, fetchRegionalProteomicsByStructure } from '../../helpers/ApolloClient';
import { CSVLink } from 'react-csv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import DiffexInfoBar from './DiffexInfoBar';
import packageJson from '../../../package.json';
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';
import InfoHeader from './InfoHeader';
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import geneButton from './geneButton';
ModuleRegistry.registerModules([ AllCommunityModule ]);

const GeneButton = ({data}) => {
    return (<button onClick={() => console.log('Software Launched')}  className='table-column btn btn-link text-start p-0'>
            {data.gene}
        </button>);
}

class DiffexByCluster extends Component {

    constructor(props) {
        super(props);
        this.state = {
            diffexData: [], isLoading: true,
            columnDefs: this.getColumns(),
            gradApi: null,
            columnApi: null
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
       if (prevProps.data !== this.props.data && this.props.data.length > 0) {
            this.state.gridApi.refreshCells()
        }

        if (this.props.dataType !== prevProps.dataType) {
            this.setState({ diffexData: [], isLoading: true });
            this.fetchGeneExpression();
        }
    }

    getAccessionLink = (gene, accession) => {
        return (<button onClick={() => this.handleClick(gene, accession)} type='button' className='table-column btn btn-link text-start p-0'>{accession}</button>);
    }

    getGeneLink = (gene) => {
        return (<a onclick={() => this.handleClick(gene)}>Hi {gene}</a>);
        // return (<button onClick={() => this.handleClick(data.gene)} type='button' className='table-column btn btn-link text-start p-0'>{data.gene}</button>);
    };


    
    getColumns = () => {
        let columns = [];
        if (this.props.dataType === 'rp') {
            columns.push(
                {
                    headerName: 'PROTEIN',
                    field: 'accession',
                    //valueFormatter: params => this.getAccessionLink(params.gene, params.accession)
                }
            );
        } else {
            columns.push(
                {
                    headerName: 'GENE',
                    field: 'gene',
                    cellRenderer: params => {
                        return (<button onClick={() => this.handleClick(params.data.gene)}  className='table-column btn btn-link text-start p-0'>
                            {params.data.gene}
                        </button>);
                    }
                }
            );
        }
        columns.push(
            {
                headerName: 'FOLD CHANGE',
                headerComponent: InfoHeader,
                headerTooltip: 'Fold change of a gene is calculated by dividing the average expression of the gene in the segment/cluster of interest by its average expression in all other segments/clusters being compared.',
                field: 'foldChange',
                sortable: true,
                sort: "desc", 
                valueFormatter: params => formatNumberToPrecision(params.foldChange, 3)
            }
        );
        if (this.props.dataType !== 'rp') {
            columns.push(
                {
                    headerName: 'P VALUE',
                    headerComponent: InfoHeader,
                    headerTooltip: 'P value was calculated using a Wilcoxon rank sum test between the expression of the gene in the segment/cluster of interest and its expression in all other segments/clusters.',
                    field: 'pVal',
                    sortable: true,
                    valueFormatter: params => formatNumberToPrecision(params.pVal, 3)
                }
            );
        }
        columns.push(
            {
                headerName: 'ADJ P VALUE',
                field: 'pValAdj',
                sortable: true,
                valueFormatter: params => formatNumberToPrecision(params.pValAdj, 3, true)
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

    onGridReady= (params) => {
        this.setState({gridApi: params.api, columnApi: params.columnApi})
        this.state.gridApi.sizeColumnsToFit();
        this.state.gridApi.refreshCells();
    }

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
                                                <div className="ag-theme-material img-fluid">
                                                    <AgGridReact
                                                        rowData={this.state.diffexData}
                                                        columnDefs={this.getColumns()}
                                                        domLayout='autoHeight'
                                                        onGridReady={this.onGridReady}
                                                        autoSizeStrategy={{type: 'fitGridWidth'}}
                                                    />
                                                </div>
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
