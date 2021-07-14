import React, {Component} from "react";

import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import {Col} from "reactstrap";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-bootstrap.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { formatNumberToPrecision } from "../../helpers/Utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";

class CustomHeader extends Component {

    render() {
        return (
            <span className='ag-header-cell-label'>
                {this.props.displayName} &nbsp;
                <span className="icon-info">
                <FontAwesomeIcon className='kpmp-light-blue'  id='fold-change-tt' icon={faInfoCircle} />
                </span>
            </span>
        )
    }
}

class CustomTooltip extends Component {

    getReactContainerClasses() {
        return ['custom-tooltip'];
    }

    render() {
        let isHeader = this.props.rowIndex === undefined;
        return (
            <React.Fragment>
            {isHeader && <div className="custom-tooltip">{this.props.tooltipText}</div>}
            </React.Fragment>
        )
    }

}


class RegionalTranscriptomicsTable extends Component {

    numberFormatter = (params) => {
        return formatNumberToPrecision(params.value, 3)
    };

    render() {
        return (
            <React.Fragment>
                <Col lg='12'>
                    <div className="ag-theme-material img-fluid" style={{height: '100%', width: '100%'}}>
                        <AgGridReact
                            rowData={this.props.data}
                            domLayout={'autoHeight'}
                            frameworkComponents={{customTooltip: CustomTooltip}}
                            tooltipShowDelay={0}
                        >
                            <AgGridColumn headerName='ABBR' field='segment' width={100}></AgGridColumn>
                            <AgGridColumn headerName='REGION' field='segmentName' width={255}></AgGridColumn>
                            <AgGridColumn headerName='# SAMPLES' field='sampleCount' width={175}></AgGridColumn>
                            <AgGridColumn headerName='STD DEVIATION' field='stdDev' valueFormatter={this.numberFormatter} width={175}></AgGridColumn>
                            <AgGridColumn headerName="FOLD CHANGE"
                                          tooltipComponent="customTooltip"
                                          headerTooltip='foldChange'
                                          tooltipComponentParams={{tooltipText:'Log fold-change of the average expression between this cluster and all others. Positive values indicate that the feature is more highly expressed in this cluster.'}}
                                          headerComponentFramework={CustomHeader}
                                          field='foldChange' sort='desc' valueFormatter={this.numberFormatter}
                                          width={175}></AgGridColumn>
                            <AgGridColumn headerName='P VALUE'
                                          headerTooltip='p-value (unadjusted).'
                                          headerComponentFramework={CustomHeader}
                                          field='pVal' valueFormatter={this.numberFormatter}
                                          width={175}></AgGridColumn>
                        </AgGridReact>
                    </div>
                </Col>
            </React.Fragment>
        )
    }

}

export default RegionalTranscriptomicsTable;