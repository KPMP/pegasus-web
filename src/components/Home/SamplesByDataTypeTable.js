import React, { Component } from 'react';
import { Grid, TableFixedColumns, TableHeaderRow, Table} from '@devexpress/dx-react-grid-bootstrap4';
import { availableDataVisibilityFilter } from '../../helpers/Utils';
import { fetchSummaryData, fetchDataTypeSummaryInformation} from '../../helpers/ApolloClient';
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
        spatialSummary = [...spatialSummary].sort(this.compare)
        spatialSummary = spatialSummary.filter(availableDataVisibilityFilter)

        let explorerSummary = await fetchDataTypeSummaryInformation();
        explorerSummary = [...explorerSummary].sort(this.compare)
        explorerSummary = explorerSummary.filter(availableDataVisibilityFilter)

        // adding lines to separate the sections in the table
        explorerSummary.unshift({dataType: "Explorer"})
        spatialSummary.unshift({dataType: "Spatial Viewer"})

        const summaryData = explorerSummary.concat(spatialSummary)
        this.setState({dataTable: summaryData});
    }

    compare( a, b ) {
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

        this.props.setDataType(dataType, this.props.featureSNData, this.props.featureSCData, this.props);

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

    getColumns() {

        return [
            {
                title: <span className="omics data-type-table-header table-header">OMICS TYPE</span>,
                name: 'dataType',
                getCellValue: row => this.formatDataTypeCell(row)
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
                name: 'dmrCount',
            },
            {
                title:
                    <span>
                        <span className="table-header data-type-table-header" id="AllParticipantsHeader">
                        ALL
                        </span>
                        <UncontrolledTooltip
                        placement="bottom"
                        target="AllParticipantsHeader">
                            All Participants
                        </UncontrolledTooltip>
                    </span>,
                name: 'totalCount'
            }
        ]
    };

    getColumnExtensions() {

        return [
            { columnName: 'dataType', width: 295},
            { columnName: 'hrtCount', width: 'auto', align: 'center'},
            { columnName: 'ckdCount', width: 'auto', align: 'center' },
            { columnName: 'akiCount', width: 'auto', align: 'center' },
            { columnName: 'dmrCount', width: 'auto', align: 'center' },
            { columnName: 'totalCount', width: 'auto', align: 'center' },
        ]
    }

    render() {
        return (
            <article id='summary-plot'>
                <Row className='mt-4'>
                    <Col xs='12'>
                        <Grid rows={this.state.dataTable} columns={this.getColumns()}>
                            <Table columnExtensions={this.getColumnExtensions()}/>
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
