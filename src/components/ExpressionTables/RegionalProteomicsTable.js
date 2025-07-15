// import React, {Component} from "react";


// import { AgGridReact } from 'ag-grid-react';
// import { AgGridColumn } from '@ag-grid-community/react';
// import {Col} from "reactstrap";
// // import 'ag-grid-community/dist/styles/ag-grid.css';
// // import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// // import 'ag-grid-community/dist/styles/ag-theme-bootstrap.css';
// // import 'ag-grid-community/dist/styles/ag-theme-material.css';
// // import 'ag-grid-community/dist/styles/ag-theme-balham.css';
// import { formatNumberToPrecision } from "../../helpers/Utils";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";


// class CustomHeader extends Component {


//     render() {
//         return (
//             <span className='ag-header-cell-label'>
//                 {this.props.displayName} &nbsp;
//                 <span className="icon-info">
//                 <FontAwesomeIcon className='kpmp-light-blue'  id='fold-change-tt' icon={faInfoCircle} />
//                 </span>
//             </span>
//         )
//     }
// }


// class CustomTooltip extends Component {


//     getReactContainerClasses() {
//         return ['custom-tooltip'];
//     }


//     render() {
//         let isHeader = this.props.rowIndex === undefined;
//         return (
//             <React.Fragment>
//                 {isHeader && <div className="custom-tooltip">{this.props.tooltipText}</div>}
//             </React.Fragment>
//         )
//     }


// }


// class RegionalProteomicsTable extends Component {


//     numberFormatter = (params) => {
//         return formatNumberToPrecision(params.value, 3)
//     };


//     render() {
//         return (
//             <React.Fragment>
//                 <Col lg='12'>
//                     <div className="ag-theme-material img-fluid" style={{height: '100%', width: '100%'}}>
//                         <AgGridReact
//                             rowData={this.props.data}
//                             domLayout={'autoHeight'}
//                             frameworkComponents={{customTooltip: CustomTooltip}}
//                             tooltipShowDelay={0}
//                         >
//                             <AgGridColumn headerName='REGION' field='segment' width={125}></AgGridColumn>
//                             <AgGridColumn headerName='FDR CONFIDENCE' field='fdrConfidence' width={150}></AgGridColumn>
//                             <AgGridColumn headerName='COVERAGE %' field='coveragePct' width={150}></AgGridColumn>
//                             <AgGridColumn headerName='# PEPTIDES' field='numPeptides' width={150}></AgGridColumn>
//                             <AgGridColumn headerName='# UNIQUE PEPTIDES' field='numUniquePeptides' width={175}></AgGridColumn>
//                             <AgGridColumn headerName='# SAMPLES' field='sampleCount' width={125}></AgGridColumn>

//                             <AgGridColumn headerName="FOLD CHANGE"
//                                           tooltipComponent="customTooltip"
//                                           headerTooltip='foldChange'
//                                           tooltipComponentParams={{tooltipText:'Fold change of a gene is calculated by dividing the average expression of the gene in the segment of interest by its average expression in all other segments being compared.'}}
//                                           headerComponentFramework={CustomHeader}
//                                           field='foldChange' sort='desc' valueFormatter={this.numberFormatter}
//                                           width={175}></AgGridColumn>
//                             <AgGridColumn headerName='ADJ P VALUE'
//                                           tooltipComponent="customTooltip"
//                                           tooltipComponentParams={{tooltipText:'P value was calculated using a Wilcoxon rank sum test between the expression of the gene in the segment of interest and its expression in all other segments.'}}
//                                           headerTooltip='pVal'
//                                           headerComponentFramework={CustomHeader}
//                                           field='pValLog10' valueFormatter={this.numberFormatter}
//                                           width={175}></AgGridColumn>
//                         </AgGridReact>
//                     </div>
//                 </Col>
//             </React.Fragment>
//         )
//     }


// }

import { AgGridReact } from "ag-grid-react";
import React, {Component} from "react";
import { formatNumberToPrecision } from "../../helpers/Utils";
import {Col} from "reactstrap";
import {
  ModuleRegistry, AllCommunityModule
} from "ag-grid-community";


 ModuleRegistry.registerModules([ AllCommunityModule ]);

class RegionalProteomicsTable extends Component {
    constructor(props) {
        super(props);
        // let rowData = [{segment:"", fdrConfidence: "", coveragePct:"", numPeptides: "", sampleCount: "", foldChange: 0, pValLog10: 0}]
        // if (props.data.length > 0) {
        //     rowData = props.data;
        // } 
        
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
        console.log(params)
        this.setState({gridApi: params.api, columnApi: params.columnApi})
        this.state.gridApi.sizeColumnsToFit();
        this.state.gridApi.refreshCells();
    }

    createColumnDefs() {
        return [
            { headerName: "REGION", field: "segment" },
            { headerName: "FDR CONFIDENCE", field: "fdrConfidence"},
            { headerName: "COVERAGE %", field: "coveragePct"},
            { headerName: "# PEPTIDES", field: "numPeptides"},
            { headerName: "# UNIQUE PEPTIDES", field: "numUniquePeptides"},
            { headerName: "# SAMPLES", field: "sampleCount"},
            { headerName: "FOLD CHANGE", field: "foldChange", valueFormatter: params => formatNumberToPrecision(params.value, 3) },
            { headerName: "ADJ P VALUE", field: "pValLog10", valueFormatter: params => formatNumberToPrecision(params.value, 3) },
        ];
    }

    render() {
        // if (this.props.data && this.props.data.length > 0) {
            console.log(this.props.data)
            return (
                <React.Fragment>
                    <Col lg='12'>
                        <div className="ag-theme-material img-fluid" style={{height: '100%', width: '100%'}}>
                            <AgGridReact columnDefs={this.state.columnDefs} rowData={this.props.data} onGridReady={this.onGridReady} debug/>
                        </div>
                    </Col>
                </React.Fragment>
            );    
        // } else {
        //     return (
        //         <React.Fragment>
        //             <Col lg='12'>
        //                 <div className="ag-theme-material img-fluid" style={{height: '100%', width: '100%'}}>
        //                     Loading...
        //                 </div>
        //             </Col>
        //         </React.Fragment>
        //     );
        // }

    }
}

export default RegionalProteomicsTable;