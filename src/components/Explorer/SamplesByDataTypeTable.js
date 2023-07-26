import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';
import { availableDataVisibilityFilter } from '../../helpers/Utils';
import { fetchSummaryData, fetchGeneDatasetSummary} from '../../helpers/ApolloClient';
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
        const geneDatasetSummary = await fetchGeneDatasetSummary("")
        summary = summary.concat(geneDatasetSummary)
        summary = summary.slice()
                        .sort( this.compare )
                        .filter(availableDataVisibilityFilter)
        this.setState({summary})
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
            this.props.setSelectedConcept(dataLinkageMapping[dataType], this.props);
        } else {
            this.props.history.push('/oops');
            throw new Error('Datatype not found', dataType)
        }
    }

    formatDataTypeCell(value) {
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

    getDefaultColumnWidths = () => {
        return [
            { columnName: 'dataType', width: 250 },
            { columnName: 'hrtCount', width: 100 },
            { columnName: 'ckdCount', width: 100 },
            { columnName: 'akiCount', width: 100 },
            { columnName: 'dmrCount', width: 100 },
        ]
    };

    getColumns() {
        return [
            {
                title: 'DATA TYPE',
                name: 'dataType',
                sortable: false,
                hideable: false,
                // headerClassName: 'omics data-type-table-header',
                // className: 'data-type-table-content',
                // minWidth: 280,
                getCellValue: row => (
                    this.formatDataTypeCell(row.value)
                )
            },
            {
                title: 'HEALTHY REFERENCE',
                name: 'hrtCount',
                sortable: false,
                hideable: false
                // headerClassName: 'data-type-table-header',
                // className: 'data-type-table-content text-center',
                // minHeaderWidth: 175,
                // minWidth: 175,
            },
            {
                title: 'CKD',
                name: 'ckdCount',
                sortable: false,
                hideable: false
                // headerClassName: 'data-type-table-header text-center',
                // className: 'data-type-table-content text-center',
                // minHeaderWidth: 75,
                // minWidth: 75,
            },
            {
                title: 'AKI',
                name: 'akiCount',
                // headerClassName: 'data-type-table-header text-center',
                // className: 'data-type-table-content text-center',
                // minHeaderWidth: 75,
                // minWidth: 75
                sortable: false,
                hideable: false
            },
            {
                title: 'DM-R',
                name: 'dmrCount',
                // headerClassName: 'data-type-table-header text-center',
                // className: 'data-type-table-content text-center',
                // minHeaderWidth: 100,
                // minWidth: 100
                sortable: false,
                hideable: false
            },
        ]
    };

    render() {
        return (
            <article id='summary-plot'>
                <h5>Select a data type</h5>
                <Row className='mt-4'>
                    <Col xs='12'>
                        <React.Fragment>
                            <Grid rows={this.state.summary} columns={this.state.columns}>
                                <Table/>
                                <TableColumnResizing defaultColumnWidths={this.getDefaultColumnWidths()}/>
                                <TableHeaderRow/>
                            </Grid>
                        </React.Fragment>
                    </Col>
                </Row>
                <Row>
                    <Col xs='12'>
                        <small><span style={{color: 'red'}}>*</span> Additional information available in <a rel='noreferrer' target='_blank' href='https://cellxgene.cziscience.com/collections/bcb61471-2a44-4d00-a0af-ff085512674c'>cellxgene</a></small>
                    </Col>
                </Row>
            </article>
        );
    }
}

export default SamplesByDataTypeTable;