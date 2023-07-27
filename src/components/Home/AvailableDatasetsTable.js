import React, { Component } from 'react';
import { Grid, TableFixedColumns, TableHeaderRow, Table} from '@devexpress/dx-react-grid-bootstrap4';
import { Row, Col } from 'reactstrap';
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';
import { fetchAtlasSummaryRows } from '../../helpers/ApolloClient';

class AvailableDatasetsTable extends Component {

    constructor(props) {
        super(props);
        this.getColumns = this.getColumns.bind(this);

        this.state = {
            totalFiles: [],
            summaryRows: []
            
        };
        
    }

    async componentDidMount(){
        const summary = await fetchAtlasSummaryRows();

        this.setState({totalFiles: summary.totalFiles});
        this.setState({summaryRows: summary.summaryRows});

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
        let linkType = row.linkInformation.linkType;
        let linkValue = row.linkInformation.linkValue;
        let mapping = `/repository/?size=n_20_n&filters[0][field]=access&filters[0][values][0]=${controlAccess}&filters[0][type]=any&filters[1][field]=${linkType}&filters[1][values][0]=${linkValue}&filters[1][type]=any`;
        if(linkType && linkValue){
            return encodeURI(mapping);
        } else {
            this.props.history.push('/oops');
            throw new Error('Datatype not found', row.omicsType)
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
                title: <span className="table-header omics data-type-table-header">OMICS TYPE</span>,
                name: 'omicsType',
                // className: 'data-type-table-content',
                // minWidth: this.getWidthBasedOnScreenSize('dataType'),
                
            },
            {
                title: 
                    <a className="buttonhref table-header data-type-table-header" href={`https://www.kpmp.org/controlled-data`}><span>CONTROLLED</span></a>
                ,
                name: 'controlledCount',
                // className: 'data-type-table-content',
                // minHeaderWidth: this.getWidthBasedOnScreenSize('controlled'),
                // minWidth: this.getWidthBasedOnScreenSize('controlled'),
                getCellValue: row => this.handleEmptyCounts(row.controlledCount, row, "controlled")
            },
            {
                title:
                    <span className='table-heade data-type-table-headerr'>OPEN</span>
                ,
                name: 'openCount',
                // className: 'data-type-table-content',
                // minHeaderWidth: this.getWidthBasedOnScreenSize('open'),
                // minWidth: this.getWidthBasedOnScreenSize('open'),
                getCellValue: row =>  this.handleEmptyCounts(row.openCount, row, "open")
            }
        ]
    };

    render() {
        return (
            <article id='summary-plot'>
                <Row className='mt-4'>
                    <Col xs='12'>
                        <Grid rows={this.state.summaryRows} columns={this.getColumns()}>
                            <Table/>
                            <TableHeaderRow/>
                            <TableFixedColumns/>
                        </Grid>
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