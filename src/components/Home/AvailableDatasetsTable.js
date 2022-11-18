import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Row, Col } from 'reactstrap';
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';

class AvailableDatasetsTable extends Component {

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

            this.props.history.push(mapping[dataType]);
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
            <span className="buttonhref" onClick={() => { this.handleDataTypeValueClick(dataType, controlAccess) }}>
                {value}
             </span>
        );
    }

    getColumns() {

        return [
            {
                Header: 'OMICS TYPE',
                id: 'dataType',
                accessor: 'dataType',
                headerClassName: 'omics data-type-table-header',
                className: 'data-type-table-content',
                minWidth:535,
                Cell: row => (
                    row.value
                )
            },
            {
                Header: () => (
                    <a className="buttonhref" href="/"><span>CONTROLLED</span></a>
                ),
                id: 'controlled',
                accessor: 'controlled',
                headerClassName: 'data-type-table-header',
                className: 'data-type-table-content',
                minHeaderWidth: 150,
                minWidth: 150,
                Cell: row => (
                    this.formatDataTypeValueCell(row.value, row.original.dataType, 'controlled')
                )
            },
            {
                Header: () => (
                    <span>OPEN</span>
                ),
                id: 'open',
                accessor: 'open',
                headerClassName: 'data-type-table-header',
                className: 'data-type-table-content',
                minHeaderWidth: 150,
                minWidth: 150,
                Cell: row => (
                    this.formatDataTypeValueCell(row.value, row.original.dataType, 'open')
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
                            data={this.props.availableDatasets}
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

export default AvailableDatasetsTable;