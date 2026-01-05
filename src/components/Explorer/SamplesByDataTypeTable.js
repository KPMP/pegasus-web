import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';
import { availableDataVisibilityFilter } from '../../helpers/Utils';
import { fetchSummaryData, fetchDataTypeSummaryInformation2025} from '../../helpers/ApolloClient';
import { Grid, TableHeaderRow, Table, TableColumnResizing} from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';


class SamplesByDataTypeTable extends Component {

    constructor(props) {
        super(props);
        this.getColumns = this.getColumns.bind(this);
        this.handleDataTypeClick = this.handleDataTypeClick.bind(this);

        this.state = {
            columns: this.getColumns(),
            summary: []
        };
    }

    compare( a, b ) {
        if ( a.dataType < b.dataType ){
          return -1;
        }
        if ( a.dataType > b.dataType ){
          return 1;
        }
        return 0;
    }


    async componentDidMount() {
        let summary = await fetchSummaryData("explorerHomepageSummary")
        const geneDatasetSummary = await this.getDatasetSummaryLocal();
        summary = summary.concat(geneDatasetSummary)
        summary = summary.slice()
                        .sort( this.compare )
                        .filter(availableDataVisibilityFilter)
        this.setState({summary})
    }

    async getDatasetSummaryLocal() {
        return await fetchDataTypeSummaryInformation2025()
    }

    handleDataTypeClick(dataType) {
        handleGoogleAnalyticsEvent('Explorer', 'Navigation', `data type: ${dataType} and gene: ${this.props.gene}`);
        this.props.setSelectedConcept(dataType, this.props);
    }

    formatDataTypeCell(row) {
        let value = row['dataType']
        if (value === 'Single-cell RNA-seq (scRNA-seq)' || value === 'Single-nucleus RNA-seq (snRNA-seq)') {

            return (
                <span className="buttonhref" onClick={() => { this.handleDataTypeClick(value) }}>
                    {value}<span style={{color: 'red'}}>*</span>
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
                title: 'DATA TYPE',
                name: 'dataType',
                sortable: false,
                hideable: false,
                getCellValue: row => this.formatDataTypeCell(row)
            },
            {
                title: 'HEALTHY REFERENCE',
                name: 'hrtCount',
                sortable: false,
                hideable: false
            },
            {
                title: 'CKD',
                name: 'ckdCount',
                sortable: false,
                hideable: false
            },
            {
                title: 'AKI',
                name: 'akiCount',
                sortable: false,
                hideable: false
            },
            {
                title: 'DM-R',
                name: 'dmrCount',
                sortable: false,
                hideable: false
            },
            {
                title: 'ALL',
                name: 'totalCount',
                sortable: false,
                hideable: false
            }
        ]
    };

    getColumnExtensions() {

        return [
            { columnName: 'dataType', align: 'left'},
            { columnName: 'hrtCount', align: 'center'},
            { columnName: 'ckdCount', align: 'center' },
            { columnName: 'akiCount', align: 'center' },
            { columnName: 'dmrCount', align: 'center' },
            { columnName: 'totalCount', align: 'center' },
        ]
    }

    getDefaultColumnWidths() {
        return [
            { columnName: 'dataType', width: 295 },
            { columnName: 'hrtCount', width: 190 },
            { columnName: 'ckdCount', width: 85 },
            { columnName: 'akiCount', width: 85 },
            { columnName: 'dmrCount', width: 85 },
            { columnName: 'totalCount', width: 85 },
        ]
    }

    render() {
        return (
            <article id='summary-plot'>
                <h5>Select a data type</h5>
                <Row className='mt-4' id='data-type-table-explorer'>
                    <Col xs='12'>
                        <React.Fragment>
                            <Grid rows={this.state.summary} columns={this.state.columns}>
                                <Table columnExtensions={this.getColumnExtensions()}/>
                                <TableColumnResizing defaultColumnWidths={this.getDefaultColumnWidths()} minColumnWidth={88}/>
                                <TableHeaderRow/>
                            </Grid>
                        </React.Fragment>
                    </Col>
                </Row>
                <Row>
                    <Col xs='12'>
                        <small><span style={{color: 'red'}}>*</span> Additional information available in <a rel='noreferrer' target='_blank' href='https://cellxgene.cziscience.com/collections/9c9d04c4-8899-417f-bb6f-6107dcadf14f'>cellxgene</a></small>
                    </Col>
                </Row>
            </article>
        );
    }
}

export default SamplesByDataTypeTable;
