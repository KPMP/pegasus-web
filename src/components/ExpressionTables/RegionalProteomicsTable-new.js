import { AgGridReact } from "ag-grid-react";
import React, {Component, useState} from "react";
import { AgGridReact } from "ag-grid-react";
import { formatNumberToPrecision } from "../../helpers/Utils";
import {Col} from "reactstrap";

const Grid = () => {
    const [colDefs, setColDefs] = useState ([
        { headerName: "REGION", field: "segment" },
        { headerName: "FDR CONFIDENCE", field: "fdrConfidence"},
        { headerName: "COVERAGE %", field: "coveragePct"},
        { headerName: "# PEPTIDES", field: "numPeptides"},
        { headerName: "# UNIQUE PEPTIDES", field: "numUniquePeptides"},
        { headerName: "# SAMPLES", field: "sampleCount"},
        { headerName: "FOLD CHANGE", field: "foldChange", valueFormatter: params => formatNumberToPrecision(params.value, 3) },
        { headerName: "ADJ P VALUE", field: "pValLog10", valueFormatter: params => formatNumberToPrecision(params.value, 3) },
    ]);

    return (
        <div style={{ width: "100%", height: "100%" }}>
        <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
        />
        </div>
    );
}

class RegionalProteomicsTable extends Component {
    render() {
        return (
            <React.Fragment>
                <Col lg='12'>
                    <div className="ag-theme-material img-fluid" style={{height: '100%', width: '100%'}}>
                        <Grid />
                    </div>
                </Col>
            </React.Fragment>
        );
    }
}