import React, {Component} from 'react';
import MaterialTable from 'material-table';
import {Col, Row, Container, Spinner} from "reactstrap";
import { formatNumberToPrecision, formatDataType } from "../../helpers/Utils"
import { fetchGeneExpression } from "../../helpers/ApolloClient";
import {CSVDownload, CSVLink} from "react-csv";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import DiffexInfoBar from './DiffexInfoBar';


class DiffexByCluster extends Component {

    constructor(props) {
        super(props);
        this.state = {
            diffexData: [], isLoading: true
        };
    };

    componentDidMount() {
        fetchGeneExpression(this.props.dataType, "", this.props.cluster, "all").then(
            (geneExpressionData) => {
                this.setState({diffexData: geneExpressionData, isLoading: false})
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
        this.props.setGene({symbol: gene, name: ""});
    };

    getExportFilename = () => {
        return "KPMP_" + formatDataType(this.props.dataType) + '-diffex_' + this.props.cluster + '_all-samples.csv';
    };

    cleanResults = (results) => {
        return results.map(({__typename, gene, id, cellCount, tableData, clusterName, dataType, tissueType, cluster, pct1, pct2, avgExp, ...theRest}) => {
                return {
                    gene: gene,
                    medianExp: avgExp,
                    pctCellsExpressing: pct1,
                    ...theRest
                }
            });
    };

    render() {
        return (
            <section>
                <DiffexInfoBar cluster={this.props.cluster} dataType={this.props.dataType} setDataType={this.props.setDataType}/>
                <Container className='mt-3 rounded border p-3 shadow-sm mb-5'>
                    {
                        this.state.isLoading ?
                            <div className='diffex-spinner text-center'>
                                <Spinner color='primary'/>
                            </div>
                            :
                            <React.Fragment>
                    <Row xs='12' className='mt-4'>
                        <Col xs='12' className="text-right">
                            <CSVLink
                                data={this.cleanResults(this.state.diffexData)}
                                filename={this.getExportFilename()}
                                target="_blank"
                                className="text-body"
                            >
                                <FontAwesomeIcon icon={faDownload} />
                            </CSVLink>
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
                        </React.Fragment>
                        }
                </Container>
            </section>
        )
    }
}

export default DiffexByCluster;