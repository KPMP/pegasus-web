import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Row, Col } from 'reactstrap';
import { setDataTypeAndRedirect } from '../../actions/DataType/dataTypeActions';
import { dataType } from '../DataViz/dataTypeReducer';

class SamplesByDataTypeTable extends Component {

    constructor(props) {
        super(props);
        this.getColumns = this.getColumns.bind(this);
        this.reactTable = React.createRef();

        this.state = {
            columns: this.getColumns(),
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
                Cell: <a href={setDataTypeAndRedirect(dataType)}>{dataType}</a>
            },
            {
                Header: () => (
                    <span>HEALTHY REFERENCE</span>
                ),
                id: 'hrtCount',
                accessor: 'hrtCount',
                headerClassName: 'data-type-table-header',
                className: 'data-type-table-content',
                minHeaderWidth: 250,
                minWidth: 250,
            },
            {
                Header: () => (
                    <span>CKD</span>
                ),
                id: 'ckdCount',
                accessor: 'ckdCount',
                headerClassName: 'data-type-table-header',
                className: 'data-type-table-content',
                minHeaderWidth: 145,
                minWidth: 145,
            },
            {
                Header: () => (
                    <span>AKI</span>
                ),
                id: 'akiCount',
                accessor: 'akiCount',
                headerClassName: 'data-type-table-header',
                className: 'data-type-table-content',
                minHeaderWidth: 145,
                minWidth: 145
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
                            data={this.props.summary}
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