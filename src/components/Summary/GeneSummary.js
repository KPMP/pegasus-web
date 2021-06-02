import React, { Component } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import ReactTable from 'react-table';
import ConceptSelectFullWidth from '../ConceptSelect/ConceptSelectFullWidth';
import { fetchGeneDatasetSummary } from '../../helpers/ApolloClient';
import { getDataTypeOptions } from "../../helpers/Utils";

class GeneSummary extends Component {

    constructor(props) {
        super(props);
        this.getColumns = this.getColumns.bind(this);
        this.reactTable = React.createRef();

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
        this.props.setDataType(dataType)
    };

    getColumns() {
        return [
            {
                Header: "OMICS TYPE",
                id: "omicsType",
                accessor: 'omicsType',
                headerClassName: 'table-header',
                className: 'table-column',
                minWidth: 200,
            },
            {
                Header: "DATA TYPE",
                id: "dataType",
                accessor: 'dataType',
                minWidth: 300,
                headerClassName: 'table-header',
                className: 'table-column data-type',
                Cell: ({ row }) => (
                    this.linkDataTypeCells(row)
                )
            },
            {
                Header: "HEALTHY REFERENCE TISSUE",
                id: "hrt",
                minWidth: 160,
                accessor: 'hrtCount',
                headerClassName: 'table-header text-center',
                className: 'table-column',
                Cell: ({ row }) => (
                    <div className={"text-center"}>{row.hrt}</div>
                )
            },
            {
                Header: "AKI TISSUE",
                id: "aki",
                accessor: 'akiCount',
                headerClassName: 'table-header text-center',
                className: 'table-column',
                Cell: ({ row }) => (
                    <div className={"text-center"}>{row.aki}</div>
                )
            },
            {
                Header: "CKD TISSUE",
                id: "ckd",
                accessor: 'ckdCount',
                headerClassName: 'table-header text-center',
                className: 'table-column',
                Cell: ({ row }) => (
                    <div className={"text-center"}>{row.ckd}</div>
                )
            },
        ]
    };

    dataTypeHasData(row) {
        if (row.hrtCount !== '-' || row.akiCount !== '-' || row.ckdCount !== '-') {
            return true;
        }
        return false;
    }

    dataTypeIsClickable(datatype) {
        let isClickable = Boolean(this.state.dataTypeOptions.find((e) => {
            if (e.value === datatype && e.isDisabled === false) {
                return true
            }
            return false
        }));
        return isClickable
    }

    linkDataTypeCells(row) {
        if (this.dataTypeHasData(row) && this.dataTypeIsClickable(row._original.dataTypeShort)) {
            return <button onClick={() => this.handleLinkClick(row._original.dataTypeShort)}
                type="button"
                className="btn btn-link text-left p-0 table-column">
                {row.dataType}
            </button>
        }

        return row.dataType;
    }

    render() {
        let { name, symbol } = this.props.gene;
        return (
            <div className='mb-4'>
                <Container className='mt-3 rounded border p-3 shadow-sm'>
                    <ConceptSelectFullWidth />
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
                                <Col xs={{ size: 5, offset: 7 }} className='d-flex justify-content-center gene-summary-header'><span>PARTICIPANTS PER DATA TYPE</span></Col>
                            </Row>
                            <Row xs='12'>
                                <Col>
                                    <ReactTable
                                        style={{ border: 'none' }}
                                        data={this.state.geneSummary}
                                        ref={this.reactTable}
                                        sortable={false}
                                        columns={this.state.columns}
                                        className='-striped gene-summary-table'
                                        showPagination={false}
                                        noDataText={'No data found'}
                                        minRows={0}
                                    />
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
