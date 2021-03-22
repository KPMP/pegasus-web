import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import ReactTable from 'react-table';
import ConceptSelectFullWidth from '../ConceptSelect/ConceptSelectFullWidth';
import initialState from '../../initialState';

class GeneSummary extends Component {

    constructor(props) {
        super(props);
        this.getColumns = this.getColumns.bind(this);
        this.reactTable = React.createRef();

        this.state = {
            columns: this.getColumns(),
            conceptSummary: initialState.conceptSummary
        };
    };

    handleLinkClick = (dataType) => {
        this.props.setDataType(dataType)
    };

    getColumns() {
        return [
            {
                Header: "OMICS TYPE",
                id: "omicsType",
                accessor: 'omicsType'
            },
            {
                Header: "DATA TYPE",
                id: "dataType",
                accessor: 'dataType',
                Cell: ({ row }) => (
                    this.linkDataTypeCells(row)
                )
            },
            {
                Header: "HEALTHY REFERENCE TISSUE",
                id: "healthyRefType",
                accessor: 'refTissue'
            },
            {
                Header: "AKI TISSUE",
                id: "akiTissue",
                accessor: 'akiTissue'
            },
            {
                Header: "CKD TISSUE",
                id: "ckdTissue",
                accessor: 'ckdTissue'
            },
        ]
    };

    linkDataTypeCells(row) {
        if (row.dataType === 'snRNASeq' || row.dataType === 'scRNASeq') {
            return <button onClick={() => this.handleLinkClick(row.dataType)} type="button" className="btn btn-link text-left p-0">{row.dataType}</button>
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
                            <h5>Summary of available data for: {value} {name && '(' + name + ')'}</h5>
                        </Col>
                    </Row>
                    <Row xs='12'>
                        <Col xs={{ size: 7, offset: 5 }} className='d-flex justify-content-center'><span>PARTICIPANTS PER DATA TYPE</span></Col>
                    </Row>
                    <Row xs='12'>
                        <Col sm={{ size: 7, offset: 5 }}><hr/></Col>
                    </Row>
                    <Row xs='12'>
                        <Col>
                            <ReactTable
                                style={{border: 'none'}}
                                data={this.state.conceptSummary}
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
export default GeneSummary;