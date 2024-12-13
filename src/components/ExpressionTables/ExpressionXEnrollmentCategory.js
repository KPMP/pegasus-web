import React, {Component} from 'react';
import { Grid, TableFixedColumns, TableHeaderRow, Table} from '@devexpress/dx-react-grid-bootstrap4';
import initialState from "../../initialState";
import {Col, Row} from "reactstrap";

class ExpressionXEnrollmentCategory extends Component {
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
                title: "ABBR",
                name: "abbr",
            },
            {
                title: "CELL TYPE",
                name: "cellType",
            },
            {
                title: "TOTAL CELLS",
                name: "totalCells",
            },
            {
                title: "MEDIAN EXPRESSION",
                name: "medianExpression",
            },
            {
                title: "# CELLS EXPRESSING",
                name: "numCellsExp",
            },
            {
                title: "FOLD CHANGE",
                name: "foldChange",
            },
            {
                title: "P VALUE",
                name: "pValue",
            },
            {
                title: "ADJ P VALUE",
                name: "adjPValue",
            }
        ]
    };

    getColumnExtensions() {

        return [
            { columnName: 'abbr', width: 106, align: 'left'},
            { columnName: 'cellType', width: 546, align: 'left'},
            { columnName: 'totalCells', width: 110, align: 'left' },
            { columnName: 'medianExpression', width: 'auto', align: 'left' },
            { columnName: 'numCellsExp', width: 'auto', align: 'left' },
            { columnName: 'foldChange', width: 'auto', align: 'left' },
            { columnName: 'pvalue', width: 'auto', align: 'left' },
            { columnName: 'adjPValue', width: 'auto', align: 'left' },
        ]
    }

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

export default ExpressionXEnrollmentCategory;