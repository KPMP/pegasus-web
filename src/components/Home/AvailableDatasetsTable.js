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
            linkInformation: {}
        };
        
    }

    async componentDidMount(){
        await this.getAtlasSummaryRows();
    }

    getAtlasSummaryRows = () => {
        fetchAtlasSummaryRows().then((result) => {
            this.setState({totalFiles: result.totalFiles});
            this.setState({summaryRows: result.summaryRows});
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

    handleEmptyCounts(count){
        return count === 0 ? "" : count;
    }

    handleDataTypeValueClick(dataType, controlAccess) {
        let mapping = {
            "3D tissue imaging and cytometry":`/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"access","value":["${controlAccess}"]}},{"op":"in","content":{"field":"experimental_strategy","value":["3D Tissue Imaging and Cytometry"]}}]}`,
            "Biomarkers":`/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"access","value":["${controlAccess}"]}},{"op":"in","content":{"field":"experimental_strategy","value":["MSD Plasma Biomarker","MSD Urine Biomarker","SomaScan Proteomics Plasma 7k"]}}]}`,
            "Bulk RNA-seq": `/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"access","value":["${controlAccess}"]}},{"op":"in","content":{"field":"experimental_strategy","value":["Bulk Total/mRNA"]}}]}`,
            "Clinical Dataset":`/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"access","value":["${controlAccess}"]}},{"op":"in","content":{"field":"data_category","value":["Clinical"]}}]}`,
            "CODEX":`/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"access","value":["${controlAccess}"]}},{"op":"in","content":{"field":"experimental_strategy","value":["CODEX"]}}]}`,
            "Experiment metadata":`/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"access","value":["${controlAccess}"]}},{"op":"in","content":{"field":"workflow_type","value":["Experimental Metadata"]}}]}`,
            "Light microscopic whole slide image":`/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"access","value":["${controlAccess}"]}},{"op":"in","content":{"field":"experimental_strategy","value":["Light Microscopic Whole Slide Images"]}}]}`,
            "LMD RNA-seq":`/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"access","value":["${controlAccess}"]}},{"op":"in","content":{"field":"experimental_strategy","value":["Regional Transcriptomics"]}}]}`,
            "SCRNA-seq": `/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"access","value":["${controlAccess}"]}},{"op":"in","content":{"field":"experimental_strategy","value":["Single-cell RNA-Seq"]}}]}`,
            "SNRNA-seq":`/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"access","value":["${controlAccess}"]}},{"op":"in","content":{"field":"experimental_strategy","value":["Single-nucleus RNA-Seq"]}}]}`,
            "Spatial transcriptomics":`/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"access","value":["${controlAccess}"]}},{"op":"in","content":{"field":"experimental_strategy","value":["Spatial Transcriptomics"]}}]}`,
        };

        if (mapping[dataType]) {
            return mapping[dataType]
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
    formatDataTypeValueCell(value, dataType, controlAccess) {
        return (
            <a href={`${this.handleDataTypeValueClick(dataType, controlAccess)}`}>
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
                Header: 'OMICS TYPE',
                id: 'dataType',
                accessor: 'omicsType',
                headerClassName: 'omics data-type-table-header',
                className: 'data-type-table-content',
                minWidth: this.getWidthBasedOnScreenSize('dataType'),
                
            },
            {
                Header: () => (
                    <a className="buttonhref" href={`https://www.kpmp.org/controlled-data`}><span>CONTROLLED</span></a>
                ),
                id: 'controlled',
                accessor: 'controlledCount',
                headerClassName: 'data-type-table-header',
                className: 'data-type-table-content',
                minHeaderWidth: this.getWidthBasedOnScreenSize('controlled'),
                minWidth: this.getWidthBasedOnScreenSize('controlled'),
                // Cell: if count is 0 return nothing, otherwise return value + link
                Cell: row => (
                    this.handleEmptyCounts(row.controlledCount)
                )
            },
            {
                Header: () => (
                    <span>OPEN</span>
                ),
                id: 'open',
                accessor: 'openCount',
                headerClassName: 'data-type-table-header',
                className: 'data-type-table-content',
                minHeaderWidth: this.getWidthBasedOnScreenSize('open'),
                minWidth: this.getWidthBasedOnScreenSize('open'),
                // Cell: if count is 0 return nothing otherwise return value + link
                Cell: row => (
                    this.handleEmptyCounts(row.openCount)
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
                <Row className="float-right">
                    <h2 className="sub-header mt-4 total-file-fix">TOTAL FILES: {this.state.totalFiles}</h2>
                </Row>
            </article>
        );
    }
}

export default AvailableDatasetsTable;