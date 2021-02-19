import React, {Component} from 'react';
import ReactTable from "react-table";
import initialState from "../../initialState";
import {Col, Container, Row} from "reactstrap";

class ExpressionXCellType extends Component {
    constructor(props) {
        super(props);
        this.getColumns = this.getColumns.bind(this);
        this.state = {
            columns: this.getColumns(),
            expressionData: initialState.expressionXCellType
        };
    };

    getColumns() {
        return [
            {
                Header: "ABBR",
                id: "abbr",
                accessor: 'abbr'
            },
            {
                Header: "CELL TYPE",
                id: "cellType",
                accessor: 'cellType',
            },
            {
                Header: "TOTAL CELLS",
                id: "totalCells",
                accessor: 'totalCells'
            },
            {
                Header: "MEDIAN EXPRESSION",
                id: "medianExpression",
                accessor: 'medianExpression'
            },
            {
                Header: "# CELLS EXPRESSING",
                id: "numCellsExp",
                accessor: 'numCellsExp'
            },
            {
                Header: "FOLD CHANGE",
                id: "foldChange",
                accessor: 'foldChange'
            },
            {
                Header: "P VALUE",
                id: "pValue",
                accessor: 'pValue'
            },
            {
                Header: "ADJ P VALUE",
                id: "adjPValue",
                accessor: 'adjPValue'
            }
        ]
    };

    render() {
        return (
            <React.Fragment>
                <Row xs='12' className='mt-5'>
                    <Col xs='12' className='mb-4'>
                        <h5>Summary of available data ... </h5>
                    </Col>
                </Row>
                <Row xs='12'>
                    <Col xs='12'>
                        <ReactTable
                            style={{border: 'none'}}
                            data={this.state.expressionData}
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