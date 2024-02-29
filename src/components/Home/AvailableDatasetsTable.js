import React, { Component } from 'react';
import { Grid, TableFixedColumns, TableHeaderRow, Table} from '@devexpress/dx-react-grid-bootstrap4';
import { Row, Col, UncontrolledTooltip } from 'reactstrap';
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';
import { fetchAtlasSummaryRows } from '../../helpers/ApolloClient';

class AvailableDatasetsTable extends Component {

    constructor(props) {
        super(props);
        this.getColumns = this.getColumns.bind(this);

        this.state = {
            totalFiles: [],
            summaryRows: [],
            
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
            'Regional proteomics':'rp',
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

    handleEmptyCounts(count, row, tissueType){
        return count === 0 ? "" : this.formatDataTypeValueCell(count, row, tissueType)
    }

    handleDataTypeValueClick(row, tissueType) {
        let linkType = row.linkInformation.linkType;
        let linkValue = row.linkInformation.linkValue.replace('&', '%26');
        let mapping = `/repository/?size=n_20_n&filters[0][field]=${linkType}&filters[0][values][0]=${linkValue}&filters[0][type]=any&filters[1][field]=tissue_type&filters[1][values][0]=${tissueType}&filters[1][type]=any`
        if(linkType && linkValue){
            return encodeURI(mapping).replace('%2526', '%26');
        } else {
            this.props.history.push('/oops');
            throw new Error('Datatype not found', row.omicsType)
        }
    }
  
    formatDataTypeValueCell(value, row, tissueType) {
        return (
            <a href={`${this.handleDataTypeValueClick(row, tissueType)}`}>
                <span className="buttonhref">
                    {value}
                </span>
            </a>
        );
    }

    getColumnExtensions() {

        return [
            { columnName: 'omicsType', width: 'auto'},
            { columnName: 'akiCount', width: 'auto'},
            { columnName: 'hrtCount', width: 'auto'},
            { columnName: 'ckdCount', width: 'auto'},
            { columnName: 'dmrCount', width: 'auto'},
        ]
    }

    getColumns() {

      return [
          {
              title: <span className="omics data-type-table-header table-header">OMICS TYPE</span>,
              name: 'omicsType',
          },
          {
              title: 
                  <span>
                    <span className="table-header data-type-table-header" id="HealthyReferenceHeader">
                     REFERENCE
                    </span>
                    <UncontrolledTooltip 
                      placement="bottom"
                      target="HealthyReferenceHeader">
                    Healthy Reference
                    </UncontrolledTooltip>
                  </span>
              ,
              getCellValue: row => this.handleEmptyCounts(row.hrtCount, row, "Healthy Reference"),
              name: 'hrtCount',
          },
          {
              title:
                  <span>
                    <span className="table-header data-type-table-header" id="CKDHeader">
                    CKD
                    </span>
                    <UncontrolledTooltip 
                      placement="bottom"
                      target="CKDHeader">
                    Chronic Kidney Disease
                    </UncontrolledTooltip>
                  </span>
              ,
              getCellValue: row => this.handleEmptyCounts(row.ckdCount, row, "CKD"),
              name: 'ckdCount',
          },
          {
              title: 
                  <span>
                    <span className="table-header data-type-table-header" id="AKIHeader">
                    AKI
                    </span>
                    <UncontrolledTooltip 
                      placement="bottom"
                      target="AKIHeader">
                    Acute Kidney Injury
                    </UncontrolledTooltip>
                  </span>
              ,
              getCellValue: row => this.handleEmptyCounts(row.akiCount, row, "AKI"),
              name: 'akiCount',
          },
          {
              title: 
                  <span>
                    <span className="table-header data-type-table-header" id="ResistorHeader">
                    DM-R
                    </span>
                    <UncontrolledTooltip 
                      placement="bottom"
                      target="ResistorHeader">
                    Diabetes Mellitus - Resilient
                    </UncontrolledTooltip>
                  </span>
              ,
              getCellValue: row => this.handleEmptyCounts(row.dmrCount, row, "DM-R"),
              name: 'dmrCount',
          }   
      ]
  };

    render() {
      console.log(this.state)
        return (
            <article id='summary-plot'>
                <Row className='mt-4'>
                    <Col xs='12'>
                        <Grid rows={this.state.summaryRows} columns={this.getColumns()}>
                            <Table columnExtensions={this.getColumnExtensions()}/>
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