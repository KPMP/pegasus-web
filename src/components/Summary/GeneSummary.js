import React, { Component } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import { Grid, TableColumnResizing, TableHeaderRow, Table, TableBandHeader} from '@devexpress/dx-react-grid-bootstrap4';
import ConceptSelectFullWidth from '../ConceptSelect/ConceptSelectFullWidth';
import { fetchDataTypeSummaryInformation } from '../../helpers/ApolloClient';
import { getDataTypeOptions } from "../../helpers/Utils";
import { handleGoogleAnalyticsEvent } from  '../../helpers/googleAnalyticsHelper';

class GeneSummary extends Component {

    constructor(props) {
        super(props);
        this.getColumns = this.getColumns.bind(this);

        this.state = {
            geneSummary: [],
            dataTypeOptions: [],
            isLoading: true,
        };
    };

    async componentDidMount() {
        await this.fetchPageData();
    }

    async componentDidUpdate(prevProps) {
        if (this.props.gene.symbol !== prevProps.gene.symbol) {
            await this.fetchPageData();
        }
    }

    fetchPageData = async() => {
        await this.fetchDataTypeSummaryLocal(this.props.gene.symbol);
        await getDataTypeOptions(this.props.gene.symbol, "").then(
            (options) => {
                this.setState({ dataTypeOptions: options, isLoading: false })
            },
            (error) => {
                this.setState({ dataTypeOptions: [] });
                console.log("There was a problem getting the data: " + error)
            }
        );
    }

    formatCountRow = (row, type) => {
        let hasData = this.dataTypeHasData(row)
        let dataTypeIsClickable = this.dataTypeIsClickable(row["dataTypeShort"])
        if (!hasData || !dataTypeIsClickable) {
            return '-'
        }
        return row[type]

    }

    fetchDataTypeSummaryLocal = async () => {
        await fetchDataTypeSummaryInformation().then(
            (dataSummary) => {
                if (dataSummary) {
                    this.setState({ geneSummary: dataSummary, isLoading: false });
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
            { columnName: 'omicsType', align: 'left'},
            { columnName: 'dataType', align: 'left'},
            { columnName: 'hrtCount', align: 'center' },
            { columnName: 'ckdCount', align: 'center' },
            { columnName: 'akiCount', align: 'center' },
            { columnName: 'dmrCount', align: 'center' },
        ]
    }

    getDefaultColumnWidths() {
        return [
            { columnName: 'omicsType', width: 268},
            { columnName: 'dataType', width: 401},
            { columnName: 'hrtCount', width: 214 },
            { columnName: 'ckdCount', width: 134 },
            { columnName: 'akiCount', width: 134 },
            { columnName: 'dmrCount', width: 134 },
        ]
    }

    getColumns() {
        return [
            {
                title: "OMICS TYPE",
                name: 'omicsType',
                sortable: false,
                hideable: false,
            },
            {
                title: "DATA TYPE",
                name: 'dataType',
                sortable: false,
                hideable: false,
                getCellValue: row => this.linkDataTypeCells(row)
            },
            {
                title: "HEALTHY REFERENCE",
                name: 'hrtCount',
                getCellValue: row => this.formatCountRow(row, 'hrtCount')
            },
            {
                title: "AKI",
                name: 'akiCount',
                getCellValue: row => this.formatCountRow(row, 'akiCount')

            },
            {
                title: "CKD",
                name: 'ckdCount',
                getCellValue: row => this.formatCountRow(row, 'ckdCount')
            },
            {
                title: "DM-R",
                name: 'dmrCount',
                getCellValue: row => this.formatCountRow(row, 'dmrCount')
            },
        ]
    };

    dataTypeHasData(row) {
        if (row.hrtCount !== 0 || row.akiCount !== 0 || row.ckdCount !== 0 || row.dmrCount !== 0) {
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

    getColumnBands() {
        return [
            {
                title: "PARTICIPANTS PER ENROLLMENT CATEGORY",
                children: [
                    { columnName: 'hrtCount'},
                    { columnName: 'akiCount' },
                    { columnName: 'ckdCount'},
                    { columnName: 'dmrCount'},
                ]
            }
        ];
    }

    render() {
        const BandCell = ({ children, tableRow, tableColumn, column, ...restProps }) => {
            return (
                <TableBandHeader.Cell {...restProps} column={column}
                    className="text-center gene-summary-header color-light-blue">
                    {children}
                </TableBandHeader.Cell>
            )
        }

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
                        <Spinner color='primary' />
                        : <div>
                            <Row xs='12' id="gene-summary-table">
                                <Col>
                                    <Grid rows={this.state.geneSummary} columns={this.getColumns()}>
                                        <Table columnExtensions={this.getColumnExtensions()}/>
                                        <TableColumnResizing defaultColumnWidths={this.getDefaultColumnWidths()} minColumnWidth={88}/>
                                        <TableHeaderRow/>
                                        <TableBandHeader columnBands={this.getColumnBands()} cellComponent={BandCell}/>
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
