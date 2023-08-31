import React, {Component} from 'react';
import { Grid, TableFixedColumns, TableHeaderRow, Table} from '@devexpress/dx-react-grid-bootstrap4';
import initialState from "../../initialState";
import {Col, Row} from "reactstrap";

class ExpressionXTissueType extends Component {
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
                        <h5>Summary of available data <span>{this.props.selectedConcept.value}</span> ...</h5>
                    </Col>
                </Row>
                <Row xs='12'>
                    <Col xs='12'>
                        <Grid rows={this.state.expressionData} columns={this.getColumns()}>
                            <Table/>
                            <TableHeaderRow/>
                            <TableFixedColumns/>
                        </Grid>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default ExpressionXTissueType;