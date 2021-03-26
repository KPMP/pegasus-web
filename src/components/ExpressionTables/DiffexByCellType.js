import React, {Component} from 'react';
import MaterialTable from 'material-table';
import {Col, Row, Container} from "reactstrap";
import { formatTissueType, formatNumberToPrecision } from "../../helpers/Utils"
import { diffexData } from '../../initialState'

class DiffexByCellType extends Component {
    constructor(props) {
        super(props);
    };

    getColumns = () => [
        { title: 'GENE', field: 'gene', cellStyle: { padding: "8px"} },
        { title: 'FOLD CHANGE', field: 'foldChange', sorting: true, defaultSort: 'ASC', cellStyle: { padding: "8px"}, type: 'numeric', render: rowData => formatNumberToPrecision(rowData.foldChange, 3)},
        { title: 'PVALUE', field: 'pVal', sorting: true, type: 'numeric', cellStyle: { padding: "8px"}, render: rowData => formatNumberToPrecision(rowData.pVal, 3) },
        { title: 'ADJ PVALUE', field: 'pValAdj', sorting: true, type: 'numeric', cellStyle: { padding: "8px"}, render: rowData => formatNumberToPrecision(rowData.pValAdj, 3) }
    ];

    render() {
        return (
            <Container className='mt-3 rounded border p-3 shadow-sm mb-5'>
                <Row xs='12' className='mt-5'>
                    <Col xs='12'>
                        <h5>Summary of available data for <span>{this.props.selectedConcept.value}</span> in {formatTissueType(this.props.tissueType)}</h5>
                    </Col>
                </Row>
                <Row xs='12'>
                    <Col xs='12'>
                        <MaterialTable
                            data={diffexData}
                            title=""
                            columns={this.getColumns()}
                            options={{
                                pageSize: 20,
                                pageSizeOptions: [],
                                rowStyle: row => {
                                    let style = {
                                        padding: "8px"
                                    };
                                    return style;
                                    }
                                }
                            }
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default DiffexByCellType;