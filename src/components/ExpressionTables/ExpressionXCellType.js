import React, {Component} from 'react';
import ReactTable from "react-table";
import {Col, Row} from "reactstrap";
import { formatTissueType, formatNumberToPrecision } from "../../helpers/Utils"

class ExpressionXCellType extends Component {
    constructor(props) {
        super(props);
        this.getColumns = this.getColumns.bind(this);
        this.state = {
            columns: this.getColumns(),
        };
    };

    getColumns() {
        return [
            {
                Header: "ABBR",
                id: "abbr",
                accessor: 'cluster'
            },
            {
                Header: "CELL TYPE",
                id: "cellType",
                accessor: 'clusterName',
            },
            {
                Header: "TOTAL CELLS",
                id: "totalCells",
                accessor: 'cellCount'
            },
            {
                Header: "MEDIAN EXPRESSION",
                id: "medianExpression",
                accessor: 'avgExpression',
                Cell: ({ value }) => formatNumberToPrecision(value, 3)
            },
            {
                Header: "% CELLS EXPRESSING",
                id: "numCellsExp",
                accessor: 'pct1'
            },
            {
                Header: "FOLD CHANGE",
                id: "foldChange",
                accessor: 'foldChange',
                Cell: ({ value }) => formatNumberToPrecision(value, 3)
            },
            {
                Header: "P VALUE",
                id: "pValue",
                accessor: 'pVal',
                Cell: ({ value }) => formatNumberToPrecision(value, 3)
            },
            {
                Header: "ADJ P VALUE",
                id: "adjPValue",
                accessor: 'pValAdj',
                Cell: ({ value }) => formatNumberToPrecision(value, 3)
            }
        ]
    };

    render() {
        return (
            <React.Fragment>
                <Row xs='12' className='mt-5'>
                    <Col xs='12'>
                        <h5>Summary of available data for <span>{this.props.selectedConcept.value}</span> in {formatTissueType(this.props.tissueType)}</h5>
                    </Col>
                </Row>
                <Row xs='12'>
                    <Col xs={{ size: 4, offset: 8 }} className='d-flex justify-content-center'><span>CLUSTER VS ALL OTHERS</span></Col>
                </Row>
                <Row xs='12'>
                    <Col sm={{ size: 4, offset: 8 }}><hr/></Col>
                </Row>
                <Row xs='12'>
                    <Col xs='12'>
                        <ReactTable
                            style={{border: 'none'}}
                            data={this.props.data}
                            ref={this.reactTable}
                            sortable={false}
                            columns={this.getColumns()}
                            className='-striped -highlight'
                            showPagination={false}
                            noDataText={'No data found'}
                            minRows={0}
                        />
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default ExpressionXCellType;