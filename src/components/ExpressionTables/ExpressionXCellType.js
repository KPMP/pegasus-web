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

    getTrProps = (state, rowInfo, instance) => {
        if (rowInfo.row.clusterName === "TOTAL CELLS: ") {
            return {
                id: "total-row"
            }
        }
        return {};
    };

    getColumns() {
        return [
            {
                Header: "ABBR",
                accessor: 'cluster',
                id: 'cluster'
            },
            {
                Header: "CLUSTER",
                accessor: 'clusterName',
                minWidth: 280,
                Cell: ({ value }) => <span title={value}>{value}</span>
            },
            {
                Header: "# CELLS",
                accessor: 'cellCount',
            },
            {
                Header: <span>Median<br/>Expression</span>,
                accessor: 'avgExp',
                Cell: ({ value }) => formatNumberToPrecision(value, 3)
            },
            {
                Header: <span>% CELLS<br/>EXPRESSING</span>,
                accessor: 'pct1',
                Cell: ({ value }) => formatNumberToPrecision(value, 3)
            },
            {
                Header: <span>FOLD<br/>CHANGE</span>,
                accessor: 'foldChange',
                Cell: ({ value }) => formatNumberToPrecision(value, 3)
            },
            {
                Header: "P VALUE",
                accessor: 'pVal',
                Cell: ({ value }) => formatNumberToPrecision(value, 3)
            },
            {
                Header: <span>ADJ<br/>P VALUE</span>,
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
                        <h5><span>{this.props.selectedConcept.value}</span> Expression Comparison across Cell Types in {formatTissueType(this.props.tissueType)}</h5>
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
                            minRows={this.props.data.length}
                            getTrProps={this.getTrProps}
                            defaultPageSize={100}
                        />
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default ExpressionXCellType;