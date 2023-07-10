import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Row, Col } from 'reactstrap';
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';
import { fetchAtlasSummaryRows } from '../../helpers/ApolloClient';

class AvailableDatasetsTable extends Component {

    constructor(props) {
        super(props);
        this.getColumns = this.getColumns.bind(this);
        this.reactTable = React.createRef();

        this.state = {
            columns: this.getColumns(),
            totalFiles: [],
            openCount: [],
            controlledCount: [],
            omicsType: [],
            linkType: [],
            linkValue: [],
            linkInformation: {},
            omicsTypes: {}
        };
        
    }

    async componentDidMount(){
        await this.getAtlasSummaryRows();
    }

    getAtlasSummaryRows = () => {
        fetchAtlasSummaryRows().then((result) => {
            this.setState({totalFiles: result.totalFiles});
            this.setState({summaryRows: result.summaryRows});
            this.setState({linkInformation: result.summaryRows.linkInformation});
            result.summaryRows.forEach((row) => {
                this.setState({[row.omicsType]: row})
                }
            )
        });
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

    handleEmptyCounts(count, row, controlAccess){
        return count === 0 ? "" : this.formatDataTypeValueCell(count, row, controlAccess)
    }

    handleDataTypeValueClick(row, controlAccess) {
        let linkType = row.original.linkInformation.linkType;
        let linkValue = row.original.linkInformation.linkValue;
        let mapping = `/repository/?size=n_20_n&filters[0][field]=access&filters[0][values][0]=${controlAccess}&filters[0][type]=any&filters[1][field]=${linkType}&filters[1][values][0]=${linkValue}&filters[1][type]=any`;
        if(linkType && linkValue){
            return encodeURI(mapping);
        } else {
            this.props.history.push('/oops');
            throw new Error('Datatype not found', row.original.omicsType)
        }
    }
  
    formatDataTypeValueCell(value, row, controlAccess) {
        return (
            <a href={`${this.handleDataTypeValueClick(row, controlAccess)}`}>
                <span className="buttonhref">
                    {value}
                </span>
            </a>
        );
    }

    getWidthBasedOnScreenSize(columnId) {
        
            if (window.innerWidth > 500) {
                if (columnId === 'dataType') {
                    return 250;
                } else if (columnId === 'controlled') {
                    return 125
                } else if (columnId === 'open') {
                    return 125
                }
            } else if (window.innerWidth < 765) {
                if (columnId === 'dataType') {
                    return 255;
                } else if (columnId === 'controlled') {
                    return 100
                } else if (columnId === 'open') {
                    return 100
                }
            } else if (window.innerWidth < 900) {
                if (columnId === 'dataType') {
                    return 535;
                } else if (columnId === 'controlled') {
                    return 125
                } else if (columnId === 'open') {
                    return 125
                }
            } else if (window.innerWidth < 1200) {
                if (columnId === 'dataType') {
                    return 535;
                } else if (columnId === 'controlled') {
                    return 150
                } else if (columnId === 'open') {
                    return 150
                }
            } else {
                return 125;
            }
    }

    getColumns() {

        return [
            {
                Header: () => (
                    <span className="table-header">OMICS TYPE</span>
                ),
                id: 'dataType',
                accessor: 'omicsType',
                headerClassName: 'omics data-type-table-header',
                className: 'data-type-table-content',
                minWidth: this.getWidthBasedOnScreenSize('dataType'),
                
            },
            {
                Header: () => (
                    <a className="buttonhref table-header" href={`https://www.kpmp.org/controlled-data`}><span>CONTROLLED</span></a>
                ),
                id: 'controlled',
                accessor: 'controlledCount',
                headerClassName: 'data-type-table-header',
                className: 'data-type-table-content',
                minHeaderWidth: this.getWidthBasedOnScreenSize('controlled'),
                minWidth: this.getWidthBasedOnScreenSize('controlled'),
                Cell: row => (
                    this.handleEmptyCounts(row.value, row, "controlled")
                    
                )
            },
            {
                Header: () => (
                    <span className='table-header'>OPEN</span>
                ),
                id: 'open',
                accessor: 'openCount',
                headerClassName: 'data-type-table-header',
                className: 'data-type-table-content',
                minHeaderWidth: this.getWidthBasedOnScreenSize('open'),
                minWidth: this.getWidthBasedOnScreenSize('open'),
                Cell: row => (
                    this.handleEmptyCounts(row.value, row, "open")
                )
            }
        ]
    };

    render() {
        return (
            <article id='summary-plot'>
                <Row className='mt-4'>
                    <Col xs='12'>
                        <ReactTable
                            style={{ border: 'none' }}
                            data={this.state.summaryRows}
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
                <Row className="float-end">
                    <h2 className="sub-header mt-4 total-file-fix">TOTAL FILES: {this.state.totalFiles}</h2>
                </Row>
            </article>
        );
    }
}

export default AvailableDatasetsTable;