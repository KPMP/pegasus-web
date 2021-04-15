import React, {Component} from 'react';
import Plot from 'react-plotly.js';
import {Spinner} from "reactstrap";

class FeaturePlot extends Component {
    constructor(props) {
        super(props);
        this.state = { plotData: [], isLoading: true };
        this.setData(props.data);
    }

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            this.setState({isLoading: true});
            this.setData(this.props.data);
        }
    }

    setData(inputData) {
        let groupData = [];
        if (inputData && inputData.featureData) {
            inputData.featureData.forEach(function(group) {

                let marker = { size:2, colorscale: 'Viridis', showscale: true};
                if (group.expression[0] !== 0) {
                    marker.color = group.expression;
                } else {
                    let grayColors = new Array(group.expression.length);
                    grayColors.fill('lightgray');
                    marker.color = grayColors;
                    marker.showscale = false;
                }
                groupData.push({
                    type: 'scattergl',
                    mode: 'markers',
                    x: group.xValues,
                    y: group.yValues,
                    marker: marker
                });
            });
            this.setState({isLoading: false})
        } else {
            this.setState({isLoading: true});
        }
        
        this.setState({plotData: groupData});

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
                <Plot divId="featurePlot" data={this.state.plotData}
                      layout={{
                          width: 460, showlegend: false,
                          yaxis: {zeroline: false, showgrid: false, showline: true},
                          xaxis: {zeroline: false, showgrid: false, showline: true},
                          autosize: false,
                          hovermode: 'compare',
                          dragmode: 'pan',
                          margin: {
                              l: 25,
                              r: 25,
                              b: 25,
                              t: 25,
                              pad: 4
                          }
                      }}
                      config={{modeBarButtonsToRemove: ['zoom2d', 'toggleSpikelines', 'displaylogo']}}
                />
            )
        }
    }
}

export default FeaturePlot;