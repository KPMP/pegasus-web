import React, {Component} from 'react';
import Plot from 'react-plotly.js';
import { median } from '../../helpers/Utils'
import { Spinner } from "reactstrap";

class UMAPPlot extends Component {
    constructor(props) {
        super(props);
        this.state = { plotData: [], plotAnnotations: [], isLoading: true };
        this.setData(props.data);
    }

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            this.setData(this.props.data);
        }
    }

    setData(inputData) {
        let clusterData = {};
        let annotations = [];
        inputData.forEach(function(line) {
            clusterData[line.clusterName] = clusterData[line.clusterName] ||
                {
                    type: 'scattergl',
                    mode: 'markers',
                    name: line.clusterName,
                    text: line.clusterName,
                    x:[],
                    y:[],
                    marker: { size: 2, color: line.clusterColor }
                };
            clusterData[line.clusterName]["x"].push(parseFloat(line.umapX));
            clusterData[line.clusterName]["y"].push(parseFloat(line.umapY));
        }, this);
        for (const cluster in clusterData) {
            annotations.push(
            {
                x: median(clusterData[cluster].x),
                y: median(clusterData[cluster].y),
                xref: 'x',
                yref: 'y',
                text: cluster,
                ax: 0,
                ay: 0,
                font: {
                    family: "Arial",
                    color: "black"
                }
            });
        }
        const clusterPlotArray = Object.entries(clusterData).map(([key, value]) => value);
        this.setState({plotData: clusterPlotArray, plotAnnotations: annotations, isLoading: false});
    };

    render() {
            if (this.state.isLoading) {
                return (
                    <div className='viz-spinner'>
                        <Spinner color='primary' />
                    </div>
                )
            } else {
                return (
                    <Plot divId="umapPlot" data={this.state.plotData}
                          layout={ { annotations: this.state.plotAnnotations, width: 460, showlegend: false,
                              yaxis: { zeroline: false, showgrid: false, showline: true },
                              xaxis: { zeroline: false, showgrid: false, showline: true },
                              autosize: false,
                              margin: {
                                  l: 25,
                                  r: 25,
                                  b: 25,
                                  t: 25,
                                  pad: 4
                              } } }/>
                )
            }
    }
}

export default UMAPPlot;