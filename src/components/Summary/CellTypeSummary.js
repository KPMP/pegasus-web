import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ReactTable from 'react-table';
import ConceptSelectFullWidth from '../ConceptSelect/ConceptSelectFullWidth';
import { fetchClusterHierarchy } from '../../helpers/ApolloClient';
import { Spinner } from "reactstrap";
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';
import Parser from 'html-react-parser';

class CellTypeSummary extends Component {

    constructor(props) {
        super(props);
        this.getColumns = this.getColumns.bind(this);
        this.reactTable = React.createRef();

        this.state = {
            columns: this.getColumns(),
            cellTypeSummary: []
        };
    };

    componentDidMount() {
        this.fetchClusterHierarchy();
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        if (this.props.cellType !== prevProps.cellType) {
            this.fetchClusterHierarchy();
        }
    }

    fetchClusterHierarchy = () => {
        this.setState({ isLoading: true });
        fetchClusterHierarchy(this.props.cellType).then(
            (cellTypeSummary) => this.setState({ cellTypeSummary: cellTypeSummary, isLoading: false }),
            (error) => {
                this.setState({ cellTypeSummary: [], isLoading: false });
                console.log('There was a problem getting the data: ' + error)
            }
        );
    };

    handleLinkClick = (dataType, row) => {
        let cluster = row.clusterName;
        if (!cluster) {
            if (!row.structureSubregion) {
                cluster = row.structureRegion;
            } else {
                cluster = row.structureSubregion;
            }
        }
        handleGoogleAnalyticsEvent('Navigation', 'diffex', 'data type: ' + dataType + ' and cluster: ' + cluster );
        this.props.setDataTypeAndCluster(dataType, cluster);
    };

    getTheadThProps = (state, rowInfo, column, instance) => {
        return { id: column.id };
    };

    parseClusterName = (value) => {
        if (value !== null) {
            return <span title={Parser(value)}>{Parser(value)}</span>
        } else {
            return ''
        }
    }

    getColumns() {
        return [
            {
                Header: <span>STRUCTURE/<br/>REGION</span>,
                id: 'structureRegion',
                accessor: 'structureRegion',
                headerClassName: 'table-header',
                className: 'table-column',
                minWidth: 75,
                Cell: ({ value }) => <span title={value}>{value}</span>
            },
            {
                Header: <span>SUBSTRUCTURE/<br/>SUBREGION</span>,
                id: 'structureSubregion',
                accessor: 'structureSubregion',
                headerClassName: 'table-header',
                className: 'table-column',
                minWidth: 125,
                Cell: ({ value }) => <span title={value}>{value}</span>
            },
            {
                Header: <span>CELL TYPE/<br/>CLUSTER (<i>predicted state</i>)</span>,
                id: 'clusterName',
                accessor: 'clusterName',
                headerClassName: 'table-header',
                className: 'table-column',
                minWidth: 450,
                Cell: ({ value }) => (
                    this.parseClusterName(value)
                )
            },
            {
                Header: <span className='cell-summary-table-header-center'>SINGLE-NUCLEUS<br />RNA-seq</span>,
                id: 'sn',
                accessor: 'isSingleNucCluster',
                headerClassName: 'table-header text-center',
                className: 'table-column text-center',
                Cell: ({ row }) => (
                    this.linkDataTypeCells(row, 'sn')
                )
            },
            {
                Header: <span className='cell-summary-table-header-center'>SINGLE-CELL<br />RNA-seq</span>,
                id: 'sc',
                accessor: 'isSingleCellCluster',
                headerClassName: 'table-header text-center',
                className: 'table-column text-center',
                Cell: ({ row }) => (
                    this.linkDataTypeCells(row, 'sc')
                )
            },
            {
                Header: <span className='cell-summary-table-header-center'>REGIONAL<br />TRASCRIPTOMICS</span>,
                id: 'rt',
                accessor: 'isRegionalTranscriptomics',
                headerClassName: 'table-header text-center',
                className: 'table-column text-center',
                Cell: ({ row }) => (
                    this.linkDataTypeCells(row, 'rt')
                )
            },
        ]
    };

    linkDataTypeCells(row, dataType) {
        if (row[dataType] === 'Y') {
            return <button onClick={() => this.handleLinkClick(dataType, row)} type='button' className='btn btn-link text-left p-0 cell-summary-table-button'>View</button>
        }
        return '';
    }

    render() {
        let cellType = this.props.cellType;
        if (this.state.isLoading) {
            return (
                <div className='viz-spinner'>
                    <Spinner color='primary' />
                </div>
            )
        } else {
            return (
                <div>
                    <Container className='mt-3 rounded border p-3 shadow-sm'>
                        <ConceptSelectFullWidth useRedirection={true} />
                    </Container>
                    <Container className='mt-3 rounded border p-3 shadow-sm'>
                        <Row xs='12'>
                            <Col className='mb-4'>
                                <h5>Summary of available data for: {cellType}</h5>
                            </Col>
                        </Row>
                        <Row xs='12'>
                            <Col>
                                <ReactTable
                                    style={{ border: 'none' }}
                                    data={this.state.cellTypeSummary}
                                    ref={this.reactTable}
                                    sortable={false}
                                    columns={this.state.columns}
                                    className='-striped cell-summary-table'
                                    showPagination={true}
                                    noDataText={'No data found'}
                                    getTheadThProps={this.getTheadThProps}
                                    minRows={0}
                                />
                            </Col>
                        </Row>
                        <Row xs='12'>
                            <Col><small>
                                <sup>1</sup>adaptive/maladaptive/repairing: Represented by cells that retain differentiation markers of reference states, albeit at lower levels, but also show expression of known injury associated genes, mesenchymal markers or factors promoting inflammation or fibrosis. &nbsp;
                                <sup>2</sup>cycling: Represented by enrichment of cell cycle genes. &nbsp;
                                <sup>3</sup>degenerative: Marked loss of differentiation markers, and/or increased %ERT, %MT, and/or marked decrease in genes detected. These cells could represent an early injury state or cells that will not recover function. &nbsp;
                                <sup>4</sup>transitional: Represented by an intermediate state showing markers of cells sharing the same parental lineage.
                                </small>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
        }
    }
}
export default CellTypeSummary;