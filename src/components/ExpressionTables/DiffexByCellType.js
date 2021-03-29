import React, {Component} from 'react';
import MaterialTable from 'material-table';
import {Col, Row, Container} from "reactstrap";
import { formatNumberToPrecision, formatDataType } from "../../helpers/Utils"
import { diffexData } from '../../initialState'

class DiffexByCellType extends Component {

    getGeneLink = (gene) => {
        return  <button onClick={() => this.handleClick(gene)} type="button" className="btn btn-link text-left p-0">{gene}</button>
    };

    getColumns = () => [
        { title: 'GENE', field: 'gene', cellStyle: { padding: "8px"}, render: rowData => this.getGeneLink(rowData.gene) },
        { title: 'FOLD CHANGE', field: 'foldChange', sorting: true, defaultSort: 'ASC', cellStyle: { padding: "8px"}, type: 'numeric', render: rowData => formatNumberToPrecision(rowData.foldChange, 3)},
        { title: 'PVALUE', field: 'pVal', sorting: true, type: 'numeric', cellStyle: { padding: "8px"}, render: rowData => formatNumberToPrecision(rowData.pVal, 3) },
        { title: 'ADJ PVALUE', field: 'pValAdj', sorting: true, type: 'numeric', cellStyle: { padding: "8px"}, render: rowData => formatNumberToPrecision(rowData.pValAdj, 3) }
    ];

    handleClick = (gene) => {
        this.props.setSelectedConcept({type: "gene", value: gene});
    };

    render() {
        return (
            <Container className='mt-3 rounded border p-3 shadow-sm mb-5'>
                <Row xs='12' className='mt-4'>
                    <Col xs='12'>
                        <h5>{formatDataType(this.props.dataType)} differential expression* [RNA] / abundance* [PROT] in {this.props.selectedConcept.value} </h5>
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