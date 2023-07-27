import React, { Component } from 'react';
import { Grid, TableFixedColumns, TableHeaderRow, Table} from '@devexpress/dx-react-grid-bootstrap4';
import { availableDataVisibilityFilter } from '../../helpers/Utils';
import { fetchSummaryData, fetchGeneDatasetSummary} from '../../helpers/ApolloClient';
import { Row, Col, UncontrolledTooltip } from 'reactstrap';
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';

class SamplesByDataTypeTable extends Component {

    constructor(props) {
        super(props);
        this.getColumns = this.getColumns.bind(this); 
        this.state = {
            dataTable: []
        }
    }

    async componentDidMount(){

        let spatialSummary = await fetchSummaryData("spatialViewerSummary");
        // spatialSummary = spatialSummary.sort(this.compare())
        spatialSummary = spatialSummary.filter(availableDataVisibilityFilter)
        let explorerSummary = await fetchGeneDatasetSummary("");
        explorerSummary = explorerSummary.sort(this.compare)
        explorerSummary = explorerSummary.filter(availableDataVisibilityFilter)

        explorerSummary.unshift({dataType: "Explorer"})
        spatialSummary.unshift({dataType: "Spatial Viewer"})
        const summaryData = explorerSummary.concat(spatialSummary)
        console.log(summaryData);
        this.setState({dataTable: summaryData});
    }

    compare( a, b ) {
        console.log(a)
        if ( a && b && a.dataType < b.dataType ){
          return -1;
        }
        if ( a.dataType > b.dataType ){
          return 1;
        }
        return 0;
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

    formatDataTypeCell(row) {
        let value = row.dataType;
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
            }else if (columnId === 'dmrCount'){
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
                }else if (columnId === 'dmrCount'){
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
            }else if (columnId === 'dmrCount') {
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
            }else if (columnId === 'dmrCount') {
                return 100
            }
        }
    }

    getColumns() {

        return [
            {
                title: <span className="table-header">OMICS TYPE</span>,
                // id: 'dataType',
                name: 'dataType',
                // headerClassName: 'omics data-type-table-header',
                // className: 'data-type-table-content',
                // minWidth: this.getWidthBasedOnScreenSize('dataType'),
                getCellValue: row => this.formatDataTypeCell(row)
            },
            {
                title: () => (
                    <span>
                      <span className="table-header" id="HealthyReferenceHeader">
                       REFERENCE
                      </span>
                      <UncontrolledTooltip 
                        placement="bottom"
                        target="HealthyReferenceHeader">
                      Healthy Reference
                      </UncontrolledTooltip>
                    </span>
                ),
                // id: 'hrtCount',
                name: 'hrtCount',
                // headerClassName: 'data-type-table-header',
                // className: 'data-type-table-content',
                // minHeaderWidth: this.getWidthBasedOnScreenSize('hrtCount'),
                // minWidth: this.getWidthBasedOnScreenSize('hrtCount'),
                
            },
            {
                title: () => (
                    <span>
                      <span className="table-header" id="CKDHeader">
                      CKD
                      </span>
                      <UncontrolledTooltip 
                        placement="bottom"
                        target="CKDHeader">
                      Chronic Kidney Disease
                      </UncontrolledTooltip>
                    </span>
                ),
                // id: 'ckdCount',
                name: 'ckdCount',
                // headerClassName: 'data-type-table-header',
                // className: 'data-type-table-content',
                // minHeaderWidth: this.getWidthBasedOnScreenSize('ckdCount'),
                // minWidth: this.getWidthBasedOnScreenSize('ckdCount')
            },
            {
                title: () => (
                    <span>
                      <span className="table-header" id="AKIHeader">
                      AKI
                      </span>
                      <UncontrolledTooltip 
                        placement="bottom"
                        target="AKIHeader">
                      Acute Kidney Injury
                      </UncontrolledTooltip>
                    </span>
                ),
                // id: 'akiCount',
                name: 'akiCount',
                // headerClassName: 'data-type-table-header',
                // className: 'data-type-table-content',
                // minHeaderWidth: this.getWidthBasedOnScreenSize('akiCount'),
                // minWidth: this.getWidthBasedOnScreenSize('akiCount')
            },
            {
                title: () => (
                    <span>
                      <span className="table-header" id="ResistorHeader">
                      DM-R
                      </span>
                      <UncontrolledTooltip 
                        placement="bottom"
                        target="ResistorHeader">
                      Diabetes Mellitus - Resilient
                      </UncontrolledTooltip>
                    </span>
                ),
                // id: 'dmrCount',
                name: 'dmrCount',
            //     headerClassName: 'data-type-table-header',
            //     className: 'data-type-table-content',
            //     minHeaderWidth: this.getWidthBasedOnScreenSize('dmrCount'),
            //     minWidth: this.getWidthBasedOnScreenSize('dmrCount')
            }   
        ]
    };

    render() {
        return (
            <article id='summary-plot'>
                <Row className='mt-4'>
                    <Col xs='12'>
                        <Grid rows={this.state.dataTable} columns={this.getColumns()}>
                            <Table/>
                            <TableHeaderRow/>
                            <TableFixedColumns/>
                        </Grid>

                    </Col>
                </Row>                        
            </article>
        );
    }
}

export default SamplesByDataTypeTable;