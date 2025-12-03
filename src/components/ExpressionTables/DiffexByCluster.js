import React, { Component } from 'react';
import { AgGridReact } from "ag-grid-react";
import { Col, Row, Container, Spinner, Input, Form, InputGroup } from 'reactstrap';
import { formatNumberToPrecision, formatDataType } from '../../helpers/Utils'
import { fetchGeneExpression, fetchGeneExpression2025, fetchRegionalTranscriptomicsByStructure, fetchRegionalProteomicsByStructure } from '../../helpers/ApolloClient';
import { CSVLink } from 'react-csv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import DiffexInfoBar from './DiffexInfoBar';
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';
import InfoHeader from './InfoHeader';
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([ AllCommunityModule ]);


class DiffexByCluster extends Component {

    constructor(props) {
        super(props);
        this.state = {
            diffexData: [], isLoading: true,
            filteredData: [],
            columnDefs: this.getColumns(),
            gradApi: null,
            columnApi: null,
            geneSearchValue: ''
        };
    };

    componentDidMount() {
        this.fetchGeneExpression();
    }

    fetchGeneExpression = () => {
        if (this.props.dataType === 'rt') {
            fetchRegionalTranscriptomicsByStructure(this.props.cluster).then(
                (geneExpressionData) => {
                    this.setState({diffexData: geneExpressionData, isLoading: false, filteredData: geneExpressionData})
                },
                (error) => {
                    this.setState({diffexData: []});
                    console.log('There was a problem getting the data: ' + error)
                }
            );
        } else if (this.props.dataType === 'rp') {
            fetchRegionalProteomicsByStructure(this.props.cluster).then(
                (geneExpressionData) => {
                    this.setState({ diffexData: geneExpressionData, isLoading: false, filteredData: geneExpressionData })
                },
                (error) => {
                    this.setState({ diffexData: [] });
                    console.log('There was a problem getting the data: ' + error)
                }
            );
        } else {
            if (this.props.featureSCData || this.props.featureSNData){
                fetchGeneExpression2025(this.props.dataType, '', this.props.cluster, 'all').then(
                    (geneExpressionData) => {
                        this.setState({ diffexData: geneExpressionData, isLoading: false, filteredData: geneExpressionData })
                    },
                    (error) => {
                        this.setState({ diffexData: [] });
                        console.log('There was a problem getting the data: ' + error)
                    }
                );

            }else{
                fetchGeneExpression(this.props.dataType, '', this.props.cluster, 'all').then(
                    (geneExpressionData) => {
                        this.setState({ diffexData: geneExpressionData, isLoading: false, filteredData: geneExpressionData })
                    },
                    (error) => {
                        this.setState({ diffexData: [] });
                        console.log('There was a problem getting the data: ' + error)
                    }
                );
                
            }
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
    
    getColumns = () => {
        let columns = [];
        if (this.props.dataType === 'rp') {
            columns.push(
                {
                    headerName: 'PROTEIN',
                    headerComponent: InfoHeader,
                    field: 'accession',
                    sortable: true,
                    cellRenderer: params => {
                        return (<button onClick={() => this.handleClick(params.data.gene, params.data.accession)} 
                        type='button' className='table-column btn btn-link text-start p-0'>{params.data.accession}</button>);
                    }
                }
            );
        } else {
            columns.push(
                {
                    headerName: 'GENE',
                    headerComponent: InfoHeader,
                    field: 'gene',
                    sortable: true,
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
                headerComponentParams: { infoIcon: true },
                headerTooltip: 'Fold change of a gene is calculated by dividing the average expression of the gene in the segment/cluster of interest by its average expression in all other segments/clusters being compared.',
                field: 'foldChange',
                sort: "desc",
                sortable: true,
                valueFormatter: params => formatNumberToPrecision(params.value, 3)
            }
        );
        if (this.props.dataType !== 'rp') {
            columns.push(
                {
                    headerName: 'P VALUE',
                    headerComponent: InfoHeader,
                    headerComponentParams: { infoIcon: true },
                    sortable: true, 
                    headerTooltip: 'P value was calculated using a Wilcoxon rank sum test between the expression of the gene in the segment/cluster of interest and its expression in all other segments/clusters.',
                    field: 'pVal',
                    valueFormatter: params => formatNumberToPrecision(params.value, 3)
                }
            );
        }
        columns.push(
            {
                headerName: 'ADJ P VALUE',
                field: 'pValAdj',
                headerComponent: InfoHeader,
                sortable: true,
                infoIcon: false,
                valueFormatter: params => formatNumberToPrecision(params.value, 3, true)
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

    inputChange = (e) => {
        this.setState({geneSearchValue: e.target.value});
    }

    search = (e) => {
        e.preventDefault();
        if (this.state.geneSearchValue.length === 0) {
            this.setState({filteredData: this.state.diffexData});
            return;
        }
        const filtered = this.state.diffexData.filter(item => {
            return item.gene.toLowerCase().includes(this.state.geneSearchValue.toLowerCase());
        });
        this.setState({filteredData: filtered});
    }

    render() {
        return (
            <div className='height-wrapper mb-3 mt-3'>
                <Container id='outer-wrapper'>
                    <DiffexInfoBar cluster={this.props.cluster} dataType={this.props.dataType} setDataType={this.props.setDataType} featureNewCellClusterData={this.props.featureNewCellClusterData} />
                    <Container className='rounded border p-3 shadow-sm mb-5'>
                        {
                            this.state.isLoading ?
                                <div className='diffex-spinner text-center'>
                                    <Spinner color='primary' />
                                </div>
                                :
                                <React.Fragment>
                                    <Row className='row-cols-lg-auto d-flex justify-content-end mb-3'>
                                        <Col>
                                            <Form onSubmit={this.search} className='diffex-table-search'>
                                                <InputGroup>
                                                    <Input name='geneSearchValue' type='text' placeholder='Search genes' onChange={this.inputChange} />
                                                    <span className='input-group-text' onClick={this.search}>
                                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                                    </span> 
                                                </InputGroup>
                                            </Form>
                                        </Col>
                                        <Col className='text-end'>
                                            <CSVLink
                                                onClick={() => handleGoogleAnalyticsEvent('Explorer', 'Download', this.getExportFilename())}
                                                data={this.cleanResults(this.state.filteredData, this.props.dataType)}
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
                                            
                                                <div className="ag-theme-material img-fluid">
                                                    <AgGridReact
                                                        rowData={this.state.filteredData}
                                                        columnDefs={this.getColumns()}
                                                        domLayout='autoHeight'
                                                        onGridReady={this.onGridReady}
                                                        autoSizeStrategy={{type: 'fitGridWidth'}}
                                                        pagination={true}
                                                        paginationPageSize={20}
                                                    />
                                                </div>
                                            
                                        </Col>
                                    </Row>
                                </React.Fragment>
                        }
                    </Container>
                </Container>
            </div>
        )
    }
}

export default DiffexByCluster;
