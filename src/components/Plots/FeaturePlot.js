import React, {Component} from 'react';
import Plot from 'react-plotly.js';

class FeaturePlot extends Component {
    constructor(props) {
        super(props);
        this.state = { plotData: [], plotAnnotations: [] };
        this.setData(props.data);
    }

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            this.setData(this.props.data);
        }
    }

    setData(inputData) {

        let allData = {};
        let annotations = [];
        inputData.forEach(function(line) {
            allData[line.expressionValue] = allData[line.expressionValue] ||
                {
                    type: 'pointcloud',
                    mode: 'markers',
                    name: line.expressionValue,
                    text: line.expressionValue,
                    expression:[],
                    x: [],
                    y: [],
                    marker: { sizemin: 2, sizemax: 2, colorscale: 'Viridis', showscale: true, color: line.expressionValue }
                };
                allData[line.expressionValue]["expression"].push(parseFloat(line.expressionValue));
                allData[line.expressionValue]["x"].push(parseFloat(line.umapX));
                allData[line.expressionValue]["y"].push(parseFloat(line.umapY));
        }, this);
  
        const clusterPlotArray = Object.entries(allData).map(([key, value]) => value);
        this.setState({plotData: clusterPlotArray, plotAnnotations: annotations});
    };



    render() {
        console.log(this.state.plotData);
        return (
            <Plot data={this.state.plotData}
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

export default FeaturePlot;