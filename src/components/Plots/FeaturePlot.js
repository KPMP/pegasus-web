import React, {Component} from 'react';
import Plot from 'react-plotly.js';
import {Spinner} from "reactstrap";

class FeaturePlot extends Component {
    constructor(props) {
        super(props);
        this.state = { plotData: [], plotAnnotations: [], isLoading: true };
        this.setData(props.data);
    }

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            this.setState({isLoading: true});
            this.setData(this.props.data);
        }
    }

    setData(inputData) {

        let allData = { 
            type: 'scattergl',
            mode: 'markers',
            expression: [],
            x: [],
            y: [],
            marker: { size:2, colorscale: 'Viridis', showscale: true, color:[]}
        };
        let annotations = [];
        inputData.forEach(function(line) {
            allData.x.push(line.umapX);
            allData.y.push(line.umapY);
            if (line.expressionValue === 0) {
                allData.marker.color.push('lightgray');
            } else {
                allData.expression.push(line.expressionValue);
                allData.marker.color.push(line.expressionValue);
            }

        }, this);
  
        this.setState({plotData: [allData], plotAnnotations: annotations, isLoading: false});
        
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
                          annotations: this.state.plotAnnotations, width: 460, showlegend: false,
                          yaxis: {zeroline: false, showgrid: false, showline: true},
                          xaxis: {zeroline: false, showgrid: false, showline: true},
                          autosize: false,
                          margin: {
                              l: 25,
                              r: 25,
                              b: 25,
                              t: 25,
                              pad: 4
                          }
                      }}/>
            )
        }
    }
}

export default FeaturePlot;