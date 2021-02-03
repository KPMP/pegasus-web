import React, {Component} from "react";
import { Container, Row, Col } from 'reactstrap';
import ReactTable from 'react-table';
import ConceptSelectContainer from '../Home/ConceptSelectContainer';
import initialState from '../../initialState';

class Summary extends Component {

    constructor(props) {
        super(props);
        this.getColumns = this.getColumns.bind(this);
        this.reactTable = React.createRef();

        this.state = {
            columns: this.getColumns(),
            conceptSummary: initialState.conceptSummary
        };
    };

    getColumns() {
        return [
            {
                Header: "OMICS TYPE",
                id: "dataType",
                accessor: (row) => row["omicsType"]
            },
            {
                Header: "DATA TYPE",
                id: "dataType",
                accessor: (row) => row["dataType"]
            },
            {
                Header: "HEALTHY REFERENCE TISSUE",
                id: "dataType",
                accessor: (row) => row["refTissue"]
            },
            {
                Header: "AKI TISSUE",
                id: "dataType",
                accessor: (row) => row["akiTissue"]
            },
            {
                Header: "CKD TISSUE",
                id: "dataType",
                accessor: (row) => row["ckdTissue"]
            },
        ]
    };

    render() {
        let {name, value} = this.props.selectedConcept;
        return (
            <div>
                <Container className="mt-3 rounded border p-3">
                    <ConceptSelectContainer/>
                </Container>
                <Container className="mt-3 rounded border p-3">
                    <Row xs="12">
                        <Col className="mb-4">
                            <h5>Summary of available data for: {value} {name && "(" + name + ")"}</h5>
                        </Col>
                    </Row>
                    <Row xs="12">
                        <Col xs={{ size: 7, offset: 5 }} className="d-flex justify-content-center"><span>PARTICIPANTS PER DATA TYPE</span></Col>
                    </Row>
                    <Row xs="12">
                        <Col sm={{ size: 7, offset: 5 }}><hr/></Col>
                    </Row>
                    <Row xs="12">
                        <Col>
                            <ReactTable
                                style={{border: "none"}}
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
export default Summary;