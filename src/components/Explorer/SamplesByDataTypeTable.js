import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';
import { availableDataVisibilityFilter } from '../../helpers/Utils';
import { fetchSummaryData, fetchGeneDatasetSummary} from '../../helpers/ApolloClient';
import { Grid, TableHeaderRow, Table, TableFixedColumns} from '@devexpress/dx-react-grid-bootstrap4';
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
        ]
    };

    getColumnExtensions() {

        return [
            { columnName: 'dataType', width: 350, align: 'left'},
            { columnName: 'hrtCount', width: 'auto', align: 'center'},
            { columnName: 'ckdCount', width: 'auto', align: 'center' },
            { columnName: 'akiCount', width: 'auto', align: 'center' },
            { columnName: 'dmrCount', width: 'auto', align: 'center' },
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
                                <TableHeaderRow/>
                                <TableFixedColumns />
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