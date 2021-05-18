import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { Col, Row, Container, Spinner, UncontrolledTooltip } from 'reactstrap';
import { formatNumberToPrecision, formatDataType } from '../../helpers/Utils'
import { fetchGeneExpression } from '../../helpers/ApolloClient';
import { CSVLink } from 'react-csv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import DiffexInfoBar from './DiffexInfoBar';


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
        fetchGeneExpression(this.props.dataType, '', this.props.cluster, 'all').then(
            (geneExpressionData) => {
                this.setState({ diffexData: geneExpressionData, isLoading: false })
            },
            (error) => {
                this.setState({ diffexData: [] });
                console.log('There was a problem getting the data: ' + error)
            }
        );
    }

    componentDidUpdate(prevProps) {
        if (this.props.dataType !== prevProps.dataType) {
            this.setState({ diffexData: [], isLoading: true });
            this.fetchGeneExpression();
        }
    }

    getGeneLink = (gene) => {
        return <button onClick={() => this.handleClick(gene)} type='button' className='table-column btn btn-link text-left p-0'>{gene}</button>
    };

    getColumns = () => [
        {
            title: 'GENE',
            field: 'gene',
            headerStyle: { fontSize: "11px" },
            cellStyle: { fontSize: '14px', padding: "2px" },
            render: rowData => this.getGeneLink(rowData.gene)
        },
        {
            title: <span>FOLD CHANGE <span className="icon-info"><FontAwesomeIcon className='kpmp-light-blue' id='fold-change-info' icon={faInfoCircle} /></span>
                <UncontrolledTooltip placement='bottom' target='fold-change-info' >
                    Log fold-change of the average expression between this cluster and all others. Positive values indicate that the feature is more highly expressed in this cluster.
                </UncontrolledTooltip></span>,
            field: 'foldChange',
            sorting: true, defaultSort: 'desc',
            headerStyle: { fontSize: '11px' },
            cellStyle: {
                fontSize: '14px',
                padding: '2px'
            },
            type: 'numeric',
            render: rowData => formatNumberToPrecision(rowData.foldChange, 3)
        },
        {
            title: <span>P VALUE <span className="icon-info"><FontAwesomeIcon className='kpmp-light-blue' id='pvalue-info' icon={faInfoCircle} /></span>
                <UncontrolledTooltip placement='bottom' target='pvalue-info' >
                    p-value (unadjusted)
                </UncontrolledTooltip></span>,
            field: 'pVal',
            sorting: true,
            type: 'numeric',
            headerStyle: { fontSize: '11px' },
            cellStyle: { fontSize: '14px', padding: '2px' },
            render: rowData => formatNumberToPrecision(rowData.pVal, 3)
        },
        {
            title: <span>ADJ P VALUE <span className="icon-info"><FontAwesomeIcon id='pvalue-adj-info' className='kpmp-light-blue' icon={faInfoCircle} /></span>
                <UncontrolledTooltip placement='bottom' target='pvalue-adj-info' >
                    Adjusted p-value, based on bonferroni correction using all features in the dataset.
                </UncontrolledTooltip></span>,
            field: 'pValAdj',
            sorting: true,
            type: 'numeric',
            headerStyle: { fontSize: '11px' },
            cellStyle: { fontSize: '14px', padding: '2px' },
            render: rowData => formatNumberToPrecision(rowData.pValAdj, 3)
        }
    ];

    handleClick = (gene) => {
        this.props.setGene({ symbol: gene, name: '' });
    };

    getExportFilename = () => {
        return 'KPMP_' + formatDataType(this.props.dataType) + '-diffex_' + this.props.cluster + '_all-samples.csv';
    };

    cleanResults = (results) => {
        return results.map(({ gene, foldChange, pVal, pValAdj }) => {
            return {
                gene: gene,
                foldChange: foldChange,
                pVal: pVal,
                pValAdj: pValAdj,
            }
        });
    };

    render() {
        return (
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
                                    <Col xs='12' className='text-right'>
                                        <CSVLink
                                            data={this.cleanResults(this.state.diffexData)}
                                            filename={this.getExportFilename()}
                                            target='_blank'
                                            className='text-body icon-container'
                                        >
                                            <FontAwesomeIcon icon={faDownload} />
                                        </CSVLink>
                                    </Col>
                                </Row>
                                <Row xs='12'>
                                    <Col xs='12'>
                                        <MaterialTable
                                            data={this.state.diffexData}
                                            title=''
                                            columns={this.getColumns()}
                                            options={{
                                                thirdSortClick: false,
                                                pageSize: 20,
                                                pageSizeOptions: [],
                                                rowStyle: row => {
                                                    let style = {
                                                        padding: '1px'
                                                    };
                                                    return style;
                                                }
                                            }} />
                                    </Col>
                                </Row>
                                <Row xs='12'>
                                    <Col xs='12'>
                                        <span>* Gene in selected cell type/region vs. all other cell types/regions</span>
                                    </Col>
                                </Row>
                            </React.Fragment>
                    }
                </Container>
            </Container>
        )
    }
}

export default DiffexByCluster;