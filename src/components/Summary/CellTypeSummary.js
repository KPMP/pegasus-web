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
        fetchClusterHierarchy(this.props.cellType).then(
            (cellTypeSummary) => this.setState({cellTypeSummary: cellTypeSummary}),
            (error) => {
                this.setState({cellTypeSummary: []});
                console.log('There was a problem getting the data: ' + error)
            }
        );
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        if (this.props.cellType !== prevProps.cellType) {
            fetchClusterHierarchy(this.props.cellType).then(
                (cellTypeSummary) => this.setState({cellTypeSummary: cellTypeSummary}),
                (error) => {
                    this.setState({cellTypeSummary: []});
                    console.log('There was a problem getting the data: ' + error)
                }
            );
        }
    }

    handleLinkClick = (dataType, cluster) => {
        this.props.setDataTypeAndCluster(dataType, cluster);
    };

    getColumns() {
        return [
            {
                Header: <span className='cell-summary-table-header-left text-'>STRUCTURE / REGION</span>,
                id: 'structureRegion',
                accessor: 'structureRegion',
                minWidth: 170,
            },
            {
                Header: <span className='cell-summary-table-header-left'>SUBSTRUCTURE / SUBREGION</span>,
                id: 'structureSubregion',
                accessor: 'structureSubregion',
                minWidth: 210,
            },
            {
                Header: <span className='cell-summary-table-header-left'>CELL TYPE / CLUSTER</span>,
                id: 'clusterName',
                accessor: 'clusterName',
                minWidth: 170,
            },
            {
                Header: <span className='cell-summary-table-header-center'>SINGLE-NUCLEUS<br/>RNA-seq</span>,
                id: 'sn',
                accessor: 'isSingleNucCluster',
                className: 'text-center',
                Cell: ({ row }) => (
                    this.linkDataTypeCells(row, 'sn')
                )
            },
            {
                Header: <span className='cell-summary-table-header-center'>SINGLE-CELL<br/>RNA-seq</span>,
                id: 'sc',
                accessor: 'isSingleCellCluster',
                className: 'text-center',
                Cell: ({ row }) => (
                    this.linkDataTypeCells(row, 'sc')
                )
            },
            {
                Header: <span className='cell-summary-table-header-center'>REGIONAL<br/>TRANSCRIPTOMICS</span>,
                id: 'lmd_rnaseq',
                accessor: 'lmd_rnaseq',
                className: 'text-center',
                minWidth: 120,
                Cell: ({ row }) => (
                    this.linkDataTypeCells('N')
                )
            },
            {
                Header: <span className='cell-summary-table-header-center'>REGIONAL<br/>PROTEOMICS</span>,
                id: 'lmd_proteomics',
                accessor: 'lmd_proteomics',
                className: 'text-center',
                Cell: ({ row }) => (
                    this.linkDataTypeCells('N')
                )
            },
        ]
    };

    linkDataTypeCells(row, dataType) {
        if (row[dataType] === 'Y') {
            return <button onClick={() => this.handleLinkClick(dataType, row.clusterName)} type='button' className='btn btn-link text-left p-0 cell-summary-table-header-center'>View</button>
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
                                className='-striped -highlight cell-summary-table'
                                showPagination={false}
                                noDataText={'No data found'}
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