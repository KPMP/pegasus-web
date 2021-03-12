import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import ReactTable from 'react-table';
import ConceptSelectFullWidth from '../ConceptSelect/ConceptSelectFullWidth';
import initialState from '../../initialState';
import { Link } from 'react-router-dom';

class CellTypeSummary extends Component {

    constructor(props) {
        super(props);
        this.getColumns = this.getColumns.bind(this);
        this.reactTable = React.createRef();

        this.state = {
            columns: this.getColumns(),
            cellTypeSummary: initialState.cellTypeSummary
        };
    };

    getColumns() {
        return [
            {
                Header: "STRUCTURE/REGION",
                id: "structure_region",
                accessor: 'structure_region'
            },
            {
                Header: "SUBSTRUCTURE/SUBREGION",
                id: "structure_subregion",
                accessor: 'structure_subregion',
                Cell: ({ row }) => (
                    this.linkDataTypeCells(row)
                )
            },
            {
                Header: "CELL TYPE",
                id: "cell_type",
                accessor: 'cell_type'
            },
            {
                Header: "scRNASeq",
                id: "sc_rnaseq",
                accessor: 'sc_rnaseq'
            },
            {
                Header: "LMD RNASeq",
                id: "lmd_rnaseq",
                accessor: 'lmd_rnaseq'
            },
            {
                Header: "LMD PROTEOMICS",
                id: "lmd_proteomics",
                accessor: 'lmd_proteomics'
            },
        ]
    };

    linkDataTypeCells(row) {
        if (row.dataType === 'snRNASeq' || row.dataType === 'scRNASeq') {
            return <Link to={{ pathname: '/dataViz'}} >{row.dataType}</Link>;
        }
        return row.dataType;
    }

    render() {
        let {name, value} = this.props.selectedConcept;
        return (
            <div>
                <Container className='mt-3 rounded border p-3 shadow-sm'>
                    <ConceptSelectFullWidth />
                </Container>
                <Container className='mt-3 rounded border p-3 shadow-sm'>
                    <Row xs='12'>
                        <Col className='mb-4'>
                            <h5>Summary of available data for: {value}</h5>
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