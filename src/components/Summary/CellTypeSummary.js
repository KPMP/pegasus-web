import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import ReactTable from 'react-table';
import ConceptSelectFullWidth from '../ConceptSelect/ConceptSelectFullWidth';
import { fetchClusterHierarchy } from '../../helpers/ApolloClient';

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
        fetchClusterHierarchy(this.props.cellType).then(
            (cellTypeSummary) => this.setState({cellTypeSummary: cellTypeSummary}),
            (error) => {
                this.setState({cellTypeSummary: []});
                console.log('There was a problem getting the data: ' + error)
            }
        );
    }

    handleLinkClick = (dataType, cluster) => {
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
                Header: <span className='cell-summary-table-header-center'>SINGLE-NUCLEUS<br/>RNA-seq</span>,
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
                Header: <span className='cell-summary-table-header-center'>SINGLE-CELL<br/>RNA-seq</span>,
                id: 'sc',
                accessor: 'isSingleCellCluster',
                headerClassName: 'table-header text-center',
                className: 'table-column text-center',
                Cell: ({ row }) => (
                    this.linkDataTypeCells(row, 'sc')
                )
            },
            {
                Header: <span className='cell-summary-table-header-center'>REGIONAL<br/>TRANSCRIPTOMICS
                </span>,
                id: 'lmd_rnaseq',
                accessor: 'lmd_rnaseq',
                headerClassName: 'table-header text-center',
                className: 'table-column text-center',
                minWidth: 120,
                Cell: ({ row }) => (
                    this.linkDataTypeCells('N')
                )
            },
            {
                Header: <span className='cell-summary-table-header-center'>REGIONAL<br/>PROTEOMICS</span>,
                id: 'lmd_proteomics',
                accessor: 'lmd_proteomics',
                headerClassName: 'table-header text-center',
                className: 'table-column text-center',
                Cell: ({ row }) => (
                    this.linkDataTypeCells('N')
                )
            },
        ]
    };

    linkDataTypeCells(row, dataType) {
        if (row[dataType] === 'Y') {
            return <button onClick={() => this.handleLinkClick(dataType, row.clusterName)} type='button' className='btn btn-link text-left p-0 cell-summary-table-button'>View</button>
        }
        return '';
    }

    render() {
        let cellType = this.props.cellType;
        return (
            <div>
                <Container className='mt-3 rounded border p-3 shadow-sm'>
                    <ConceptSelectFullWidth />
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
                                style={{border: 'none'}}
                                data={this.state.cellTypeSummary}
                                ref={this.reactTable}
                                sortable={false}
                                columns={this.state.columns}
                                className='-striped cell-summary-table'
                                showPagination={false}
                                noDataText={'No data found'}
                                getTheadThProps={this.getTheadThProps}
                                minRows = {0}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default CellTypeSummary;