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

class RegionalProteomicsTable extends Component {
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
            { headerName: "REGION", field: "segment", width: 125, sortable: false },
            { headerName: "FDR CONFIDENCE", field: "fdrConfidence", width: 150, sortable: false},
            { headerName: "COVERAGE %", field: "coveragePct", width: 150, sortable: false},
            { headerName: "# PEPTIDES", field: "numPeptides", width: 150, sortable: false},
            { headerName: "# UNIQUE PEPTIDES", field: "numUniquePeptides", width: 175, sortable: false},
            { headerName: "# SAMPLES", field: "sampleCount", width: 125, sortable: false},
            { headerName: "FOLD CHANGE", field: "foldChange", valueFormatter: params => formatNumberToPrecision(params.value, 3), width: 175, sortable: false,
                headerComponent: CustomHeader,
                headerTooltip: 'Fold change of a gene is calculated by dividing the average expression of the gene in the segment of interest by its average expression in all other segments being compared.'
            },
            { headerName: "ADJ P VALUE", field: "pValLog10", valueFormatter: params => formatNumberToPrecision(params.value, 3), width: 175, sortable: false,
                headerComponent: CustomHeader,
                headerTooltip: 'P value was calculated using a Wilcoxon rank sum test between the expression of the gene in the segment of interest and its expression in all other segments.'
            },
        ];
    }

    render() {
        return (
            <React.Fragment>
                <Col lg='12'>
                    <div className="ag-theme-material img-fluid">
                        <AgGridReact columnDefs={this.state.columnDefs} rowData={this.props.data} onGridReady={this.onGridReady}
                            domLayout='autoHeight' />
                    </div>
                </Col>
            </React.Fragment>
        );    
    }
}

export default RegionalProteomicsTable;