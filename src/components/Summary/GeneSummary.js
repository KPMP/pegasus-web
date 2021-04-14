import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import ReactTable from 'react-table';
import ConceptSelectFullWidth from '../ConceptSelect/ConceptSelectFullWidth';

class GeneSummary extends Component {

    constructor(props) {
        super(props);
        this.getColumns = this.getColumns.bind(this);
        this.reactTable = React.createRef();

        this.state = {
            columns: this.getColumns(),
        };
    };

    handleLinkClick = (dataType) => {
        this.props.setDataType(dataType)
    };

    getCellSummaryData = () => {
        return [
            {
                omicsType: 'TRANSCRIPTOMICS',
                dataType: 'Single-nucleus RNA-seq (snRNA-seq)',
                dataTypeShort: 'sn',
                hrt: 3,
                aki: 6,
                ckd: 10
            },
            {
                omicsType: '',
                dataType: 'Single-cell RNA-seq (scRNA-seq)',
                dataTypeShort: 'sc',
                hrt: '-',
                aki: 12,
                ckd: 15
            },
            {
                omicsType: '',
                dataType: 'Regional transcriptomics',
                dataTypeShort: 'rt',
                hrt: '-',
                aki: '-',
                ckd: '-'
            },
            {
                omicsType: 'PROTEOMICS',
                dataType: 'Regional proteomics',
                dataTypeShort: 'rp',
                hrt: '-',
                aki: '-',
                ckd: '-'
            },
            {
                omicsType: 'IMAGING',
                dataType: '3D Cytometry',
                dataTypeShort: '3dc',
                hrt: '-',
                aki: '-',
                ckd: '-'
            },
            {
                omicsType: 'METABOLOMICS',
                dataType: 'Spatial Metabolomics',
                dataTypeShort: 'sm',
                hrt: '-',
                aki: '-',
                ckd: '-'
            },
        ]
    };

    getColumns() {
        return [
            {
                Header: "OMICS TYPE",
                id: "omicsType",
                accessor: 'omicsType'
            },
            {
                Header: "DATA TYPE",
                id: "dataType",
                accessor: 'dataType',
                minWidth: 160,
                Cell: ({ row }) => (
                    this.linkDataTypeCells(row)
                )
            },
            {
                Header: "HEALTHY REFERENCE TISSUE",
                id: "hrt",
                minWidth: 160,
                accessor: 'hrt',
                Cell: ({ row }) => (
                    <div className={"text-center"}>{row.hrt}</div>
                )
            },
            {
                Header: "AKI TISSUE",
                id: "aki",
                accessor: 'aki',
                Cell: ({ row }) => (
                    <div className={"text-center"}>{row.aki}</div>
                )
            },
            {
                Header: "CKD TISSUE",
                id: "ckd",
                accessor: 'ckd',
                Cell: ({ row }) => (
                    <div className={"text-center"}>{row.ckd}</div>
                )
            },
        ]
    };

    linkDataTypeCells(row) {
        if (row._original.dataTypeShort === 'sn' || row._original.dataTypeShort === 'sc') {
            return <button onClick={() => this.handleLinkClick(row._original.dataTypeShort)} type="button" className="btn btn-link text-left p-0">{row.dataType}</button>
        }
        return row.dataType;
    }

    render() {
        let {name, symbol} = this.props.gene;
        return (
            <div className='mb-4'>
                <Container className='mt-3 rounded border p-3 shadow-sm'>
                    <ConceptSelectFullWidth />
                </Container>
                <Container className='mt-3 rounded border p-3 shadow-sm'>
                    <Row xs='12'>
                        <Col className='mb-4'>
                            <h5>Summary of available data for: {symbol} {name && '(' + name + ')'}</h5>
                        </Col>
                    </Row>
                    <Row xs='12'>
                        <Col xs={{ size: 7, offset: 5 }} className='d-flex justify-content-center'><span>PARTICIPANTS PER DATA TYPE</span></Col>
                    </Row>
                    <Row xs='12'>
                        <Col sm={{ size: 7, offset: 5 }}><hr/></Col>
                    </Row>
                    <Row xs='12'>
                        <Col>
                            <ReactTable
                                style={{border: 'none'}}
                                data={this.getCellSummaryData()}
                                ref={this.reactTable}
                                sortable={false}
                                columns={this.state.columns}
                                className='-striped -highlight'
                                showPagination={false}
                                noDataText={'No data found'}
                                minRows = {0}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default GeneSummary;