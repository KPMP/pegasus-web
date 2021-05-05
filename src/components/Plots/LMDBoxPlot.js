import {Spinner} from "reactstrap";
import React, {Component} from 'react';
import RNASeqViz from "../DataViz/RNASeqViz";

class LMDBoxPlot extends Component {

    constructor(props) {
        super(props);
        this.state = { plotData: [], isLoading: false };
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div className='viz-spinner'>
                    <Spinner color='primary'/>
                </div>
            )
        } else {
            return (
                <div>[BoxPlotGoesHere]</div>
            )
        }
    }
}

export default LMDBoxPlot;