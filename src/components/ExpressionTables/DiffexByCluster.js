import React, {Component} from 'react';
import MaterialTable from 'material-table';
import { Col, Row, Container } from "reactstrap";
import { formatNumberToPrecision, formatDataType } from "../../helpers/Utils"
import { fetchGeneExpression } from "../../helpers/ApolloClient";

class DiffexByCluster extends Component {

    constructor(props) {
        super(props);
        this.state = {
            diffexData: []
        };
    };

    componentDidMount() {
        fetchGeneExpression(this.props.dataType, "", this.props.cellType, this.props.tissueType).then(
            (geneExpressionData) => {
                this.setState({diffexData: geneExpressionData})
            },
            (error) => {
                this.setState({diffexData: []});
                console.log("There was a problem getting the data: " + error)
            }
        );
    }

    getGeneLink = (gene) => {
        return  <button onClick={() => this.handleClick(gene)} type="button" className="btn btn-link text-left p-0">{gene}</button>
    };

    getColumns = () => [
        { title: 'GENE', field: 'gene', cellStyle: { padding: "8px"}, render: rowData => this.getGeneLink(rowData.gene) },
        { title: 'FOLD CHANGE', field: 'foldChange', sorting: true, cellStyle: { padding: "8px"}, type: 'numeric', render: rowData => formatNumberToPrecision(rowData.foldChange, 3)},
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
                        <h5>{formatDataType(this.props.dataType)} {(this.props.dataType === 'sn' || this.props.dataType === 'sc')?"differential expression*":"abundance*"} in {this.props.cluster} </h5>
                    </Col>
                </Row>
                <Row xs='12'>
                    <Col xs='12'>
                        <MaterialTable
                            data={this.state.diffexData}
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
                <Row xs='12'>
                    <Col xs='12'>
                       <span>* Gene in selected cell type/region vs. all other cell types/regions</span>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default DiffexByCluster;