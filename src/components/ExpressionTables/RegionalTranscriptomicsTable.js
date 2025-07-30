import { AgGridReact } from "ag-grid-react";
import React, {Component} from "react";
import { formatNumberToPrecision } from "../../helpers/Utils";
import {Col} from "reactstrap";
import {
  ModuleRegistry, AllCommunityModule
} from "ag-grid-community";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

ModuleRegistry.registerModules([ AllCommunityModule ]);

const CustomHeader = (props) => {
    return (
        <div className='ag-header-cell-text' style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <span>{props.displayName}</span>
            <FontAwesomeIcon className='kpmp-light-blue' icon={faCircleInfo} style={{ marginLeft: '5px' }} />
        </div>
    );
};


class RegionalTranscriptomicsTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columnDefs: this.createColumnDefs(),
            gridApi: null,
            columnApi: null,
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data && this.props.data.length > 0) {
            this.state.gridApi.refreshCells()
        }
    }

    onGridReady= (params) => {
        this.setState({gridApi: params.api, columnApi: params.columnApi})
        this.state.gridApi.sizeColumnsToFit();
        this.state.gridApi.refreshCells();
    }

    createColumnDefs() {

        return [
            { headerName: "ABBR", field: "segment", width: 100, sortable: false },
            { headerName: "REGION", field: "segmentName", width: 255, sortable: false},
            { headerName: "# SAMPLES", field: "sampleCount", width: 175, sortable: false},
            { headerName: "STD DEVIATION", field: "stdDev", valueFormatter: params => formatNumberToPrecision(params.value, 3), width: 175, sortable: false},
            { headerName: "FOLD CHANGE", field: "foldChange", valueFormatter: params => formatNumberToPrecision(params.value, 3), width: 175,
                headerTooltip: 'Fold change of a gene is calculated by dividing the average expression of the gene in the segment of interest by its average expression in all other segments being compared.',
                headerComponent: CustomHeader,
                sort: 'desc',
                sortable: false
            },
            { headerName: "P VALUE", field: "pVal", valueFormatter: params => formatNumberToPrecision(params.value, 3), width: 175,
                headerTooltip: 'P value was calculated using a Wilcoxon rank sum test between the expression of the gene in the segment of interest and its expression in all other segments.',
                headerComponent: CustomHeader,
                sortable: false
             },
        ];
    }

    render() {

        return (
            <React.Fragment>
                <Col lg='12'>
                    <div className="ag-theme-material img-fluid">
                        <AgGridReact columnDefs={this.state.columnDefs} rowData={this.props.data} onGridReady={this.onGridReady}
                            showGrid={true} domLayout='autoHeight'
                        />
                    </div>
                </Col>
            </React.Fragment>
        );
    }
}


export default RegionalTranscriptomicsTable;
