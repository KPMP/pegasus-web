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
        let clusterData = [];
        let annotations = [];
        if (inputData && inputData.referenceData) {
            inputData.referenceData.forEach(function(cluster) {
                clusterData.push({
                    type: 'scattergl',
                    mode: 'markers',
                    text: cluster.clusterName,
                    x: cluster.xValues,
                    y: cluster.yValues,
                    marker: { size:2, color: cluster.color}
                });
                annotations.push({
                    x: median(cluster.xValues),
                    y: median(cluster.yValues),
                    xref: 'x',
                    yref: 'y',
                    text: cluster.clusterName,
                    ax: 0,
                    ay: 0,
                    font: { 
                        family: 'Arial',
                        color: 'black'
                    }
                });
            });
            this.setState({isLoading: false})
        } else {
            this.setState({isLoading: true});
        }
        this.setState({plotData: clusterData, plotAnnotations: annotations});
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
                              hovermode: 'compare',
                              dragmode: 'pan',
                              margin: {
                                  l: 25,
                                  r: 25,
                                  b: 25,
                                  t: 25,
                                  pad: 4
                              } } }
                          config={{displayLogo: false, modeBarButtonsToRemove: ['zoom2d', 'toggleSpikelines']}}
                    />
                )
            }
    }
}

export default UMAPPlot;