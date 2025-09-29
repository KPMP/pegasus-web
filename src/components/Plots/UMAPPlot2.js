import React, { Component } from 'react';
import { Spinner } from "reactstrap";

const DataTypeEnum = {
    SINGLE_NUCLEUS: 'sn',
    SINGLE_CELL: 'sc'
}

class UMAPPlot2 extends Component {
    render() {
        if (!this.props.dataType) {
            return (
                <div className='viz-spinner'>
                    <Spinner color='primary' />
                </div>
            )
        } else {
            return (
                <div id="umapPlot-container">
                    { this.props.dataType === DataTypeEnum.SINGLE_CELL &&
                        <img
                            id="umapPlot"
                            alt="all samples of single cell UMAP"
                            src="/img/sc_reference-UMAP_all-samples_2025-09-23.png" />
                    }
                    { this.props.dataType === DataTypeEnum.SINGLE_NUCLEUS &&
                        <img
                            id="umapPlot"
                            alt="all samples of single nucleus UMAP"
                            src="/img/sn_reference-UMAP_all-samples_2024-02-06.svg" />
                    }

                </div>
            )
        }
    }
}

export default UMAPPlot2;
