import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import ReactTable from 'react-table';
import initialState from '../../initialState';

class UpsetPlot extends Component {
    constructor(props) {
        super(props);
        this.getColumns = this.getColumns.bind(this);
        this.reactTable = React.createRef();

        this.state = {
            columns: this.getColumns(),
            summary: initialState.dataTypeByParticipant
        };
    }

    getColumns() {
        return [
            {
                Header: 'PARTICIPANTS',
                id: "diseaseType",
                accessor: 'diseaseType',
                headerStyle: { whiteSpace: 'pre-wrap'}
            },
            {
                Header: "SN RNAseq",
                id: "sn-rnaseq",
                accessor: 'sn-rnaseq',
                Cell: ({row}) => (
                    this.renderCell(row, 'sn-rnaseq', 'sc-rnaseq')
                ),
                headerStyle: { whiteSpace: 'pre-wrap'}
            },
            {
                Header: "SC RNAseq",
                id: "sc-rnaseq",
                accessor: 'sc-rnaseq',
                Cell: ({row}) => (
                    this.renderCell(row, 'sc-rnaseq', 'lmd-rnaseq')
                ),
                headerStyle: { whiteSpace: 'pre-wrap'}
            },
            {
                Header: "LMD RNAseq",
                id: "lmd-rnaseq",
                accessor: 'lmd-rnaseq',
                Cell: ({row}) => (
                    this.renderCell(row, 'lmd-rnaseq', 'bulk-rnaseq')
                ),
                headerStyle: { whiteSpace: 'pre-wrap'}
            },
            {
                Header: "Bulk RNAseq",
                id: "bulk-rnaseq",
                accessor: 'bulk-rnaseq',
                Cell: ({row}) => (
                    this.renderCell(row, 'bulk-rnaseq', 'lmd proteomics')
                ),
                headerStyle: { whiteSpace: 'pre-wrap'}
            },
            {
                Header: "LMD Proteomics",
                id: "lmd proteomics",
                accessor: 'lmd proteomics',
                Cell: ({row}) => (
                    this.renderCell(row, 'lmd proteomics', '3d cytometry')
                ),
                headerStyle: { whiteSpace: 'pre-wrap'}
            },
            {
                Header: "3D Cytometry",
                id: "3d cytometry",
                accessor: '3d cytometry',
                Cell: ({row}) => (
                    this.renderCell(row, '3d cytometry', 'spatial metabolomics')
                ),
                headerStyle: { whiteSpace: 'pre-wrap'}
            },
            {
                Header: "Spatial Metabolomics",
                id: "spatial metabolomics",
                accessor: 'spatial metabolomics',
                Cell: ({row}) => (
                    this.renderCell(row, 'spatial metabolomics')
                ),
                headerStyle: { whiteSpace: 'pre-wrap'}
            },
        ]
    };

    renderCell(row, dataType, nextDataType) {
        // I know we are taking in nextData type and ignoring it, this was done in an attempt to make an 
        // upset plot using tables. Leaving it in as I never got the connecting lines added and if we revisit
        // we'll want that anyway
        let fontColor = 'black';
        if (row.diseaseType === 'AKI') {
            fontColor = '#0275d8';
        } else if (row.diseaseType === 'CKD') {
            fontColor = '#8B0000';
        }

        let bulletStyle = { fontSize: "22px", fontWeight: 900, textAlign: "center", display: "block", color: fontColor };

        if (row[dataType] === true) {
            return <span style={bulletStyle}>&bull;</span>;
        }
 
    }

    render() {
        return(
            <article id="upset-plot">
                <Row className='mt-4'>
                    <Col xs='12'>
                        <span className='title'>Overlap of Participants Across Data Types</span>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col xs='12'>
                        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.</div>
                    </Col>
                </Row>
                <Row className='mt-4 mb-4'>
                    <Col xs='12'>
                        <ReactTable
                            style={{border: 'none'}}
                            data={this.state.summary}
                            ref={this.reactTable}
                            sortable={false}
                            columns={this.state.columns}
                            className='-striped'
                            showPagination={false}
                            noDataText={'No data found'}
                            minRows = {0}
                            resizable={false}
                        />
                    </Col>
                </Row>
            </article>

        );
    }
}

export default UpsetPlot;