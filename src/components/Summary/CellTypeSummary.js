import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Grid, TableFixedColumns, TableHeaderRow, Table} from '@devexpress/dx-react-grid-bootstrap4';
import ConceptSelectFullWidth from '../ConceptSelect/ConceptSelectFullWidth';
import { fetchClusterHierarchy } from '../../helpers/ApolloClient';
import { Spinner } from "reactstrap";
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';
import Parser from 'html-react-parser';
import { stripHtml } from "string-strip-html";

class CellTypeSummary extends Component {

    constructor(props) {
        super(props);
        this.getColumns = this.getColumns.bind(this);

        this.state = {
            cellTypeSummary: [],
            isLoading: true
        };
    };

   async componentDidMount() {
        await this.fetchClusterHierarchy();
    }

    async componentDidUpdate(prevProps, prevState, snapShot) {
        if (this.props.cellType !== prevProps.cellType) {
            await this.fetchClusterHierarchy();
        }
    }

    fetchClusterHierarchy = async () => {
        this.setState({ isLoading: true });
        let results = await fetchClusterHierarchy(this.props.cellType);
        this.setState({ cellTypeSummary: results, isLoading: false });
    };

    handleLinkClick = (dataType, row) => {
        let cluster = row.clusterName;
        if (!cluster) {
            if (!row.structureSubregion) {
                cluster = row.structureRegion;
            } else {
                cluster = row.structureSubregion;
            }
        }
        handleGoogleAnalyticsEvent('Explorer', 'Navigation', `data type: ${dataType} and cluster: ${cluster}`);
        this.props.setDataTypeAndCluster(dataType, cluster);
    };

    parseClusterName = (value) => {
        if (value !== null) {
            let titleVal = stripHtml(value.replace('<sup>', ' ^')).result
                .replace('( ', '(')
                .replace(' )', ')');
            return <span title={titleVal}>{Parser(value)}</span>
        } else {
            return ''
        }
    };

    getColumnExtensions() {

        return [
            { columnName: 'structureRegion', width: 75, align: 'left'},
            { columnName: 'structureSubregion', width: 125, align: 'left'},
            { columnName: 'clusterName', width: 450, align: 'left' },
            { columnName: 'sn', width: 'auto', align: 'left' },
            { columnName: 'sc', width: 'auto', align: 'left' },
            { columnName: 'rt', width: 'auto', align: 'left' },
        ]
    }

    getColumns() {
        return [
            {
                title: <span className='table-header'>STRUCTURE/<br />REGION</span>,
                name: 'structureRegion',
                // className: 'table-column',
                getCellValue: row => <span title={row.structureRegion}>{row.structureRegion}</span>
            },
            {
                title: <span className='table-header'>SUBSTRUCTURE/<br />SUBREGION</span>,
                name: 'structureSubregion',
                // className: 'table-column',
                getCellValue: row => <span title={row.structureSubregion}>{row.structureSubregion}</span>
            },
            {
                title: <span className='table-header'>CELL TYPE/<br />CLUSTER (<i>predicted state</i>)</span>,
                name: 'clusterName',
                // className: 'table-column',
                getCellValue: row => (
                    this.parseClusterName(row.clusterName)
                )
            },
            {
                title: <span className='cell-summary-table-header-center'>SINGLE-NUCLEUS<br />RNA-seq</span>,
                name: 'sn',
                // headerClassName: 'table-header text-center',
                // className: 'table-column text-center',
                getCellValue: row => (
                    this.linkDataTypeCells(row.isSingleNucCluster, 'sn', row)
                )
            },
            {
                title: <span className='cell-summary-table-header-center'>SINGLE-CELL<br />RNA-seq</span>,
                name: 'sc',
                // headerClassName: 'table-header text-center',
                // className: 'table-column text-center',
                getCellValue: row => (
                    this.linkDataTypeCells(row.isSingleCellCluster, 'sc', row)
                )
            },
            {
                title: <span className='cell-summary-table-header-center'>REGIONAL<br />TRASCRIPTOMICS</span>,
                id: 'rt',
                // headerClassName: 'table-header text-center',
                // className: 'table-column text-center',
                getCellValue: row => (
                    this.linkDataTypeCells(row.isRegionalTranscriptomics, 'rt', row)
                )
            },
        ]
    };

    linkDataTypeCells(isOfType, dataType, row) {
        if (isOfType === 'Y') {
            return <button onClick={() => this.handleLinkClick(dataType, row)} type='button' className='btn btn-link text-start p-0 cell-summary-table-button'>View</button>
        }
        return '';
    }

    render() {
        let cellType = this.props.cellType;
        if (this.state.isLoading) {
            return (
                <div className='viz-spinner'>
                    <Spinner color='primary' />
                </div>
            )
        } else {
            return (
                <div className='height-wrapper mb-3'>
                    <Container className='mt-3 rounded border p-3 shadow-sm'>
                        <ConceptSelectFullWidth overflowWarningContainer={true} useRedirection={true} />
                    </Container>
                    <Container className='mt-3 rounded border p-3 shadow-sm'>
                        <Row xs='12'>
                            <Col className='mb-4'>
                                <h5>Summary of available data for: {cellType}</h5>
                            </Col>
                        </Row>
                        <Row xs='12'>
                            <Col>
                                <Grid rows={this.state.cellTypeSummary} columns={this.getColumns()}>
                                    <Table columnExtensions={this.getColumnExtensions()}/>
                                    <TableHeaderRow/>
                                    <TableFixedColumns/>
                                </Grid>
                            </Col>
                        </Row>
                        <Row xs='12'>
                            <Col><small>
                                <sup>1</sup>adaptive/maladaptive/repairing: Represented by cells that retain differentiation markers of reference states, albeit at lower levels, but also show expression of known injury associated genes, mesenchymal markers or factors promoting inflammation or fibrosis. &nbsp;
                                <sup>2</sup>cycling: Represented by enrichment of cell cycle genes. &nbsp;
                                <sup>3</sup>degenerative: Marked loss of differentiation markers, and/or increased %ERT, %MT, and/or marked decrease in genes detected. These cells could represent an early injury state or cells that will not recover function. &nbsp;
                                <sup>4</sup>transitional: Represented by an intermediate state showing markers of cells sharing the same parental lineage.
                            </small>
                                <p></p>

                                <small>
                                    For more information about the cell type, cluster, and state definitions, see the following pre-print: <a target="_blank" rel="noreferrer" href="https://www.biorxiv.org/content/10.1101/2021.07.28.454201v1">https://www.biorxiv.org/content/10.1101/2021.07.28.454201v1</a>
                                </small>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
        }
    }
}
export default CellTypeSummary;