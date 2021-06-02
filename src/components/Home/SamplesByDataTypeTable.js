import React, { Component } from 'react';
import ReactTable from 'react-table';
import initialState from '../../initialState';
import { Row, Col } from 'reactstrap';

class SamplesByDataTypeTable extends Component {

    constructor(props) {
        super(props);
        this.getColumns = this.getColumns.bind(this);
        this.reactTable = React.createRef();

        this.state = {
            columns: this.getColumns(),
            summary: initialState.summary
        };
    }

    getColumns() {

        return [
            {
                Header: 'OMICS TYPE',
                id: 'dataType',
                accessor: 'dataType',
                headerClassName: 'omics data-type-table-header',
                className: 'data-type-table-content',
                minWidth: 295,
            },
            {
                Header: () => (
                    <span>HEALTHY REFERENCE</span>
                ),
                id: 'healthyTissue',
                accessor: 'healthyTissue',
                headerClassName: 'data-type-table-header',
                className: 'data-type-table-content',
                minHeaderWidth: 250,
                minWidth: 250,
            },
            {
                Header: () => (
                    <span>CKD</span>
                ),
                id: 'ckdTissue',
                accessor: 'ckdTissue',
                headerClassName: 'data-type-table-header',
                className: 'data-type-table-content',
                minHeaderWidth: 150,
                minWidth: 150,
            },
            {
                Header: () => (
                    <span>AKI</span>
                ),
                id: 'akiTissue',
                accessor: 'akiTissue',
                headerClassName: 'data-type-table-header',
                className: 'data-type-table-content',
                minHeaderWidth: 150,
                minWidth: 150
            },
        ]
    };

    render() {
        return (
            <article id='summary-plot'>
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