// import React, {Component} from "react";

// import { AgGridReact } from 'ag-grid-react';
// import { AgGridColumn } from '@ag-grid-community/react';
// import {Col} from "reactstrap";
// // import 'ag-grid-community/dist/ag-grid-community.js';
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
//             {isHeader && <div className="custom-tooltip">{this.props.tooltipText}</div>}
//             </React.Fragment>
//         )
//     }

// }

// class RegionalTranscriptomicsTable extends Component {

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
//                             <AgGridColumn headerName='ABBR' field='segment' width={100}></AgGridColumn>
//                             <AgGridColumn headerName='REGION' field='segmentName' width={255}></AgGridColumn>
//                             <AgGridColumn headerName='# SAMPLES' field='sampleCount' width={175}></AgGridColumn>
//                             <AgGridColumn headerName='STD DEVIATION' field='stdDev' valueFormatter={this.numberFormatter} width={175}></AgGridColumn>
//                             <AgGridColumn headerName="FOLD CHANGE"
//                                           tooltipComponent="customTooltip"
//                                           headerTooltip='foldChange'
//                                           tooltipComponentParams={{tooltipText:'Fold change of a gene is calculated by dividing the average expression of the gene in the segment of interest by its average expression in all other segments being compared.'}}
//                                           headerComponentFramework={CustomHeader}
//                                           field='foldChange' sort='desc' valueFormatter={this.numberFormatter}
//                                           width={175}></AgGridColumn>
//                             <AgGridColumn headerName='P VALUE'
//                                           tooltipComponent="customTooltip"
//                                           tooltipComponentParams={{tooltipText:'P value was calculated using a Wilcoxon rank sum test between the expression of the gene in the segment of interest and its expression in all other segments.'}}
//                                           headerTooltip='pVal'
//                                           headerComponentFramework={CustomHeader}
//                                           field='pVal' valueFormatter={this.numberFormatter}
//                                           width={175}></AgGridColumn>
//                         </AgGridReact>
//                     </div>
//                 </Col>
//             </React.Fragment>
//         )
//     }

// }

import { AgGridReact } from "ag-grid-react";
import React, {Component, useState, useMemo} from "react";
import { formatNumberToPrecision } from "../../helpers/Utils";
import {Col} from "reactstrap";
import {
  ModuleRegistry, AllCommunityModule
} from "ag-grid-community";

 ModuleRegistry.registerModules([ AllCommunityModule ]);


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
            { headerName: "ABBR", field: "segment", width: 100 },
            { headerName: "REGION", field: "segmentName", width: 255},
            { headerName: "# SAMPLES", field: "sampleCount", width: 175},
            { headerName: "STD DEVIATION", field: "stdDev", valueFormatter: params => formatNumberToPrecision(params.value, 3), width: 175},
            { headerName: "FOLD CHANGE", field: "foldChange", valueFormatter: params => formatNumberToPrecision(params.value, 3), width: 175,
                headerTooltip: 'Fold change of a gene is calculated by dividing the average expression of the gene in the segment of interest by its average expression in all other segments being compared.',
                headerComponentParams: {
                    icon: 'fa-user',
                },
                sort: 'desc'
            },
            { headerName: "ADJ P VALUE", field: "pValLog10", valueFormatter: params => formatNumberToPrecision(params.value, 3), width: 175,
                 headerTooltip: 'P value was calculated using a Wilcoxon rank sum test between the expression of the gene in the segment of interest and its expression in all other segments.',
                headerComponentParams: {
                    icon: 'fa-cog',
                }
             },
        ];
    }

    render() {
        return (
            <React.Fragment>
                <Col lg='12'>
                    <div className="ag-theme-material img-fluid">
                        <AgGridReact columnDefs={this.state.columnDefs} rowData={this.props.data} onGridReady={this.onGridReady}
                            showGrid={true} domLayout='autoHeight' />
                    </div>
                </Col>
            </React.Fragment>
        );
    }
}


export default RegionalTranscriptomicsTable;