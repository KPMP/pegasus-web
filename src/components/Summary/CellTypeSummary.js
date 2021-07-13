import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ReactTable from 'react-table';
import ConceptSelectFullWidth from '../ConceptSelect/ConceptSelectFullWidth';
import { fetchClusterHierarchy } from '../../helpers/ApolloClient';
import { Spinner } from "reactstrap";

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
        this.props.setDataTypeAndCluster(dataType, cluster);
    };

    getTheadThProps = (state, rowInfo, column, instance) => {
        return { id: column.id };
    };

    getColumns() {
        return [
            {
                Header: <span>STRUCTURE/REGION</span>,
                id: 'structureRegion',
                accessor: 'structureRegion',
                headerClassName: 'table-header',
                className: 'table-column',
                minWidth: 150,
                Cell: ({ value }) => <span title={value}>{value}</span>
            },
            {
                Header: <span>SUBSTRUCTURE/SUBREGION</span>,
                id: 'structureSubregion',
                accessor: 'structureSubregion',
                headerClassName: 'table-header',
                className: 'table-column',
                minWidth: 195,
                Cell: ({ value }) => <span title={value}>{value}</span>
            },
            {
                Header: 'CELL TYPE/CLUSTER',
                id: 'clusterName',
                accessor: 'clusterName',
                headerClassName: 'table-header',
                className: 'table-column',
                minWidth: 240,
                Cell: ({ value }) => <span title={value}>{value}</span>
            },
            {
                Header: <span className='cell-summary-table-header-center'>SINGLE-NUCLEUS<br />RNA-seq</span>,
                id: 'sn',
                accessor: 'isSingleNucCluster',
                headerClassName: 'table-header text-center',
                className: 'table-column text-center',
                minWidth: 120,
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
                    </Container>
                </div>
            )
        }
    }
}
export default CellTypeSummary;