import React, {Component} from 'react';
import Plot from 'react-plotly.js';

class UMAPPlot extends Component {
    constructor(props) {
        super(props);
        this.state = { plotData: [] };
        this.setData(props.data);
    }

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            this.setData(this.props.data);
        }
    }

    setData(inputData) {
        let xaxis = [];
        let yaxis = [];
        let cluster = [];
        let clusterData = {};
        const clusterToColor = (clusterNum) => {
            const colorMatch = ["red", "orange", "yellow", "green", "cyan", "blue", "purple", "pink", "gray", "brown", "salmon", "gold", "peachpuff", "olive", "teal", "steelblue"];
            return colorMatch[clusterNum];
        };
        inputData.forEach(function(line) {
            xaxis.push(line.umapX);
            yaxis.push(line.umapY);
            cluster.push(line.clusterColor);
            clusterData[line.clusterName] = clusterData[line.clusterName] || {"xValues":[], "yValues":[]};
            clusterData[line.clusterName]["xValues"].push(parseFloat(line.tSNE_1));
            clusterData[line.clusterName]["yValues"].push(parseFloat(line.tSNE_2));
        }, this);
        let clusterLabelX = [];
        let clusterLabelY = [];
        let clusterLabelText = [];
        for (const cluster in clusterData) {
            clusterLabelX.push(clusterData[cluster].xValues.reduce((a, b) => (a + b)) / clusterData[cluster].xValues.length);
            clusterLabelY.push(clusterData[cluster].yValues.reduce((a, b) => (a + b)) / clusterData[cluster].yValues.length);
            clusterLabelText.push(cluster)
        }
        let clusterPlot = {
            type: 'scatter',
            mode: 'markers',
            x: xaxis,
            y: yaxis,
            marker: { size: '2', color: cluster }
        };
        let clusterLabelPlot = {
            type: 'scatter',
            mode: 'text',
            x: clusterLabelX,
            y: clusterLabelY,
            text: clusterLabelText,
            textfont : {
                family:'Arial Black'
            },
            marker: { size: '24', color: 'black' }
        };
        this.setState({plotData: [clusterPlot, clusterLabelPlot]});
    };



    render() {
        return (
            <Plot data={this.state.plotData}
                  layout={ { width: 460, showlegend: false,
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

export default UMAPPlot;