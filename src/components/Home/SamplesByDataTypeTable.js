import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Row, Col } from 'reactstrap';
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';

class SamplesByDataTypeTable extends Component {

    constructor(props) {
        super(props);
        this.getColumns = this.getColumns.bind(this);
        this.reactTable = React.createRef();

        this.state = {
            columns: this.getColumns(),
        };
    }
    handleDataTypeClick(dataType) {
        handleGoogleAnalyticsEvent('Explorer', 'Navigation', `data type: ${dataType} and gene: ${this.props.gene}`);
        let dataLinkageMapping = {
            'Single-nucleus RNA-seq (snRNA-seq)': 'sn',
            'Single-cell RNA-seq (scRNA-seq)': 'sc',
            'Regional transcriptomics': 'rt',
            'Light Microscopic Whole Slide Images': 'wsi',
            '3D Tissue Imaging and Cytometry': '3d',
            'CODEX': 'codex',
            'Spatial Metabolomics': 'sm',
            'Spatial Lipidomics': 'sl',
            'Spatial N-glycomics': 'sng',
            'Spatial Transcriptomics': 'st'
        };
        if (dataLinkageMapping[dataType]) {
            this.props.setDataType(dataLinkageMapping[dataType], this.props);
        } else {
            this.props.history.push('/oops');
            throw new Error('Datatype not found', dataType)
        }
    }
    formatDataTypeCell(value) {
        if (value === 'Explorer' || value === 'Spatial Viewer') {
            return (
                <span>
                    <b>{value}</b>
                 </span>
            );
        } else {
            return (
                <span className="buttonhref" onClick={() => { this.handleDataTypeClick(value) }}>
                    {value}
                 </span>
            );
        }

    }
    getWidthBasedOnScreenSize(columnId) {
        if (window.innerWidth < 900) {
            if (columnId === 'dataType') {
                return 260;
            } else if (columnId === 'hrtCount') {
                return 150
            } else if (columnId === 'ckdCount') {
                return 100
            } else if (columnId === 'akiCount') {
                return 100
            }
        } else if (window.innerWidth < 1000) {
                if (columnId === 'dataType') {
                    return 260;
                } else if (columnId === 'hrtCount') {
                    return 150
                } else if (columnId === 'ckdCount') {
                    return 80
                } else if (columnId === 'akiCount') {
                    return 80
                }
        } else if (window.innerWidth < 1200) {
            if (columnId === 'dataType') {
                return 260;
            } else if (columnId === 'hrtCount') {
                return 150
            } else if (columnId === 'ckdCount') {
                return 85
            } else if (columnId === 'akiCount') {
                return 85
            }
        } else if (window.innerWidth >= 1200) {
            if (columnId === 'dataType') {
                return 260;
            } else if (columnId === 'hrtCount') {
                return 150
            } else if (columnId === 'ckdCount') {
                return 100
            } else if (columnId === 'akiCount') {
                return 100
            }
        }
    }

    getColumns() {

        return [
            {
                Header: 'OMICS TYPE',
                id: 'dataType',
                accessor: 'dataType',
                headerClassName: 'omics data-type-table-header',
                className: 'data-type-table-content',
                minWidth: this.getWidthBasedOnScreenSize('dataType'),
                Cell: row => (
                    this.formatDataTypeCell(row.value)
                )
            },
            {
                Header: () => (
                    <span>HEALTHY REFERENCE</span>
                ),
                id: 'hrtCount',
                accessor: 'hrtCount',
                headerClassName: 'data-type-table-header',
                className: 'data-type-table-content',
                minHeaderWidth: this.getWidthBasedOnScreenSize('hrtCount'),
                minWidth: this.getWidthBasedOnScreenSize('hrtCount'),
                
            },
            {
                Header: () => (
                    <span>CKD</span>
                ),
                id: 'ckdCount',
                accessor: 'ckdCount',
                headerClassName: 'data-type-table-header',
                className: 'data-type-table-content',
                minHeaderWidth: this.getWidthBasedOnScreenSize('ckdCount'),
                minWidth: this.getWidthBasedOnScreenSize('ckdCount')
            },
            {
                Header: () => (
                    <span>AKI</span>
                ),
                id: 'akiCount',
                accessor: 'akiCount',
                headerClassName: 'data-type-table-header',
                className: 'data-type-table-content',
                minHeaderWidth: this.getWidthBasedOnScreenSize('akiCount'),
                minWidth: this.getWidthBasedOnScreenSize('akiCount')
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