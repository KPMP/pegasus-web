import React, { Component } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import { Grid, TableFixedColumns, TableHeaderRow, Table} from '@devexpress/dx-react-grid-bootstrap4';
import ConceptSelectFullWidth from '../ConceptSelect/ConceptSelectFullWidth';
import { fetchGeneDatasetSummary } from '../../helpers/ApolloClient';
import { getDataTypeOptions } from "../../helpers/Utils";
import { handleGoogleAnalyticsEvent } from  '../../helpers/googleAnalyticsHelper';

class GeneSummary extends Component {

    constructor(props) {
        super(props);
        this.getColumns = this.getColumns.bind(this);

        this.state = {
            columns: this.getColumns(),
            geneSummary: [],
            dataTypeOptions: [],
            isLoading: true,
        };
    };

    componentDidMount() {
        this.fetchPageData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.gene.symbol !== prevProps.gene.symbol) {
            this.fetchPageData();
        }
    }

    fetchPageData() {
        this.fetchGeneDatasetSummary(this.props.gene.symbol);
        getDataTypeOptions(this.props.gene.symbol, "").then(
            (options) => {
                this.setState({ dataTypeOptions: options })
            },
            (error) => {
                this.setState({ dataTypeOptions: [] });
                console.log("There was a problem getting the data: " + error)
            }
        );
    }

    formatGeneDataset(geneSummary) {
        for (const [dataType] of geneSummary.entries()) {
            let dataTypeIsClickable = this.dataTypeIsClickable(geneSummary[dataType]["dataTypeShort"])
            if (geneSummary[dataType]["hrtCount"] === '0' || !dataTypeIsClickable) {
                geneSummary[dataType]["hrtCount"] = '-';
            }
            if (geneSummary[dataType]["akiCount"] === '0' || !dataTypeIsClickable) {
                geneSummary[dataType]["akiCount"] = '-';
            }
            if (geneSummary[dataType]["ckdCount"] === '0' || !dataTypeIsClickable) {
                geneSummary[dataType]["ckdCount"] = '-';
            }
            if (geneSummary[dataType]["dmrCount"] === '0' || !dataTypeIsClickable) {
                geneSummary[dataType]["dmrCount"] = '-';
            }
        }
        return geneSummary
    }

    fetchGeneDatasetSummary = (geneSymbol) => {
        this.setState({ isLoading: true });
        fetchGeneDatasetSummary(geneSymbol).then(
            (geneSummary) => {
                if (geneSummary) {
                    geneSummary = this.formatGeneDataset(geneSummary)
                    this.setState({ geneSummary, isLoading: false });
                }
            },
            (error) => {
                this.setState({ geneSummary: [], isLoading: false });
                console.log('There was a problem fetching the gene summary data: ' + error)
            }
        );
    }

    handleLinkClick = (dataType) => {
        handleGoogleAnalyticsEvent('Explorer', 'Navigation', `data type: ${dataType} and gene: ${this.props.gene.symbol}`);
        this.props.setDataType(dataType)
    };

    getColumnExtensions() {

        return [
            { columnName: 'omicsType', width: 268, align: 'left'},
            { columnName: 'dataType', width: 401, align: 'left'},
            { columnName: 'hrtCount', width: 214, align: 'center' },
            { columnName: 'ckdCount', width: 134, align: 'center' },
            { columnName: 'akiCount', width: 134, align: 'center' },
            { columnName: 'dmrCount', width: 134, align: 'center' },
        ]
    }

    getColumns() {
        return [
            {
                title: "OMICS TYPE",
                name: 'omicsType',
                sortable: false,
                hideable: false,
                // headerClassName: 'gene-summary-header',
                // className: 'table-column',
            },
            {
                title: "DATA TYPE",
                name: 'dataType',
                // headerClassName: 'gene-summary-header',
                // className: 'table-column data-type',
                sortable: false,
                hideable: false,
                getCellValue: row => this.linkDataTypeCells(row)
            },
            {
                title: "HEALTHY REFERENCE TISSUE",
                name: 'hrtCount',
                // headerClassName: 'text-center gene-summary-header',
                // className: 'table-column',
            },
            {
                title: "AKI TISSUE",
                name: 'akiCount',
                // headerClassName: 'text-center gene-summary-header',
                // className: 'table-column',

            },
            {
                title: "CKD TISSUE",
                name: 'ckdCount',
                // headerClassName: 'text-center gene-summary-header',
                // className: 'table-column',
            },
            {
                title: "DM-R TISSUE",
                name: 'dmrCount',
                // headerClassName: 'text-center gene-summary-header',
                // className: 'table-column',
            },
        ]
    };

    dataTypeHasData(row) {
        if (row.hrtCount !== '-' || row.akiCount !== '-' || row.ckdCount !== '-' || row.dmrCount !== '-') {
            return true;
        }
        return false;
    }

    dataTypeIsClickable(datatype) {
        let isClickable = Boolean(this.state.dataTypeOptions.find((e) => {
            if (e.value === datatype && e.isDisabled === false) {
                return true;
            } else {
                return false;
            }
        }));
        return isClickable
    }

    linkDataTypeCells(row) {
        if (this.dataTypeHasData(row) && this.dataTypeIsClickable(row.dataTypeShort)) {
            return <button onClick={() => this.handleLinkClick(row.dataTypeShort)}
                type="button"
                className="btn btn-link text-start p-0 table-column">
                {row.dataType}
            </button>
        }

        return row.dataType;
    }

    render() {
        let { name, symbol } = this.props.gene;
        return (
            <div className='height-wrapper mb-3'>
                <Container className='mt-3 rounded border p-3 shadow-sm'>
                    <ConceptSelectFullWidth overflowWarningContainer={true} useRedirection={true} />
                </Container>
                <Container className='mt-3 rounded border p-3 shadow-sm'>
                    <Row xs='12'>
                        <Col className='mb-4'>
                            <h5 className="gene-summary-info-header">Summary of available data for: {symbol} {name && '(' + name + ')'}</h5>
                        </Col>
                    </Row>
                    {this.state.isLoading ?
                        <div className='summary-spinner'>
                            <Spinner color='primary' />
                        </div>
                        : <div>
                            <Row xs='12' className="gene-summary-header-container">
                                <Col xs={{ size: 5, offset: 7 }} className='d-flex justify-content-center gene-summary-header color-light-blue'><span>PARTICIPANTS PER DATA TYPE</span></Col>
                            </Row>
                            <Row xs='12'>
                                <Col>
                                    <Grid rows={this.state.geneSummary} columns={this.state.columns}>
                                        <Table columnExtensions={this.getColumnExtensions()}/>
                                        <TableHeaderRow/>
                                        <TableFixedColumns/>
                                    </Grid>
                                </Col>
                            </Row>
                        </div>
                    }
                </Container>
            </div>
        )
    }
}
export default GeneSummary;
