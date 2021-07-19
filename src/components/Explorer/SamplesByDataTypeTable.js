
import React, { Component } from 'react';
import ReactTable from 'react-table';
import initialState from '../../initialState';
import { Row, Col } from 'reactstrap';
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';

class SamplesByDataTypeTable extends Component {

    constructor(props) {
        super(props);
        this.getColumns = this.getColumns.bind(this);
        this.handleDataTypeClick = this.handleDataTypeClick.bind(this);
        this.reactTable = React.createRef();

        this.state = {
            columns: this.getColumns(),
            summary: initialState.summary
        };
    }
    handleDataTypeClick(dataType) {
        handleGoogleAnalyticsEvent('Navigation', 'blank slate visualization', dataType);
        let dataLinkageMapping = {
            'Single-nucleus RNA-seq (snRNA-seq)': 'sn',
            'Single-cell RNA-seq (scRNA-seq)': 'sc',
            'Regional transcriptomics (LMD RNA-seq)': 'rt',
        };

        this.props.setSelectedConcept(dataLinkageMapping[dataType], this.props);
    }

    getColumns() {
        return [
            {
                Header: 'DATA TYPE',
                id: 'dataType',
                accessor: 'dataType',
                headerClassName: 'omics data-type-table-header',
                className: 'data-type-table-content',
                minWidth: 330,
                Cell: e => <a onClick={() => this.handleDataTypeClick(e.value)} href="#">
                    {e.value}
                </a>
            },
            {
                Header: () => (
                    <span>HEALTHY REFERENCE</span>
                ),
                id: 'healthyTissue',
                accessor: 'healthyTissue',
                headerClassName: 'data-type-table-header',
                className: 'data-type-table-content text-center',
                minHeaderWidth: 175,
                minWidth: 175,
            },
            {
                Header: () => (
                    <span>CKD</span>
                ),
                id: 'ckdTissue',
                accessor: 'ckdTissue',
                headerClassName: 'data-type-table-header text-center',
                className: 'data-type-table-content text-center',
                minHeaderWidth: 100,
                minWidth: 100,
            },
            {
                Header: () => (
                    <span>AKI</span>
                ),
                id: 'akiTissue',
                accessor: 'akiTissue',
                headerClassName: 'data-type-table-header text-center',
                className: 'data-type-table-content text-center',
                minHeaderWidth: 100,
                minWidth: 100
            },
        ]
    };

    render() {
        return (
            <article id='summary-plot'>
                <h5>Select a data type</h5>
                <Row className='mt-4'>
                    <Col xs='12'>
                        <ReactTable
                            style={{ border: 'none' }}
                            data={this.state.summary}
                            ref={this.reactTable}
                            sortable={false}
                            columns={this.state.columns}
                            className='samples-by-datatype -striped'
                            showPagination={false}
                            noDataText={'No data found'}
                            minRows={0}
                        />
                    </Col>
                </Row>
            </article>
        );
    }
}

export default SamplesByDataTypeTable;