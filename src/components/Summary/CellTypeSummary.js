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
                Header: 'STRUCTURE/REGION',
                id: 'structureRegion',
                accessor: 'structureRegion'
            },
            {
                Header: 'SUBSTRUCTURE/SUBREGION',
                id: 'structureSubregion',
                accessor: 'structureSubregion',
            },
            {
                Header: 'CELL TYPE / CLUSTER',
                id: 'clusterName',
                accessor: 'clusterName'
            },
            {
                Header: 'scRNASeq',
                id: 'sc',
                accessor: 'isSingleCellCluster',
                className: 'text-center',
                Cell: ({ row }) => (
                    this.linkDataTypeCells(row, 'sc')
                )
            },
            {
                Header: 'snRNASeq',
                id: 'sn',
                accessor: 'isSingleNucCluster',
                className: 'text-center',
                Cell: ({ row }) => (
                    this.linkDataTypeCells(row, 'sn')
                )
            },
            {
                Header: 'LMD RNASeq',
                id: 'lmd_rnaseq',
                accessor: 'lmd_rnaseq',
                className: 'text-center',
                Cell: ({ row }) => (
                    this.linkDataTypeCells('N')
                )
            },
            {
                Header: 'LMD PROTEOMICS',
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
            return <button onClick={() => this.handleLinkClick(dataType, row.clusterName)} type='button' className='btn btn-link text-left p-0'>View</button>
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
                                className='-striped -highlight'
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