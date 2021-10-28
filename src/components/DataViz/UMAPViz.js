import React, { Component } from 'react';
import Plotly from '../../helpers/Plotly';
import createPlotlyComponent from 'react-plotly.js/factory';
import { median } from '../../helpers/Utils';
import { fetchPlotlyData } from "../../helpers/ApolloClient";
const Plot = createPlotlyComponent(Plotly);

class UMAP extends Component {

    constructor(props) {
        super(props);
        this.state = {
            plotData: [], plotAnnotations: [],
            plotHeight: 600,
            plotWidth: 600,
        };
        
    }

    componentDidMount() {
        window.addEventListener("resize", this.setPlotSize);
        this.getUmapPoints(this.props.dataType, this.props.gene.symbol, this.props.tissueType, 'network-only');
    
    }

    componentWillUnmount() {
        window.addEventListener("resize", null);
    }

    setData(inputData) {
        let clusterData = [];
        let annotations = [];
        if (inputData && inputData.referenceData) {
            inputData.referenceData.forEach(function (cluster) {
                clusterData.push({
                    type: 'scattergl',
                    mode: 'markers',
                    name: '',
                    hoverinfo: 'text',
                    text: cluster.clusterAbbreviation + "<br>" + cluster.clusterName,
                    x: cluster.xValues,
                    y: cluster.yValues,
                    marker: { size: 2, color: cluster.color }
                });
                annotations.push({
                    x: median(cluster.xValues),
                    y: median(cluster.yValues),
                    xref: 'x',
                    yref: 'y',
                    ax: 0,
                    ay: 0,
                    font: {
                        family: 'Arial',
                        color: 'black'
                    }
                });
            });
         
        }
        this.setState({ plotData: clusterData, plotAnnotations: annotations });
    };

    getUmapPoints = async (dataType, gene, tissueType, fetchPolicy) => {
        const results = await fetchPlotlyData(dataType, gene, tissueType, fetchPolicy);
        this.setData(results);
    };

    render() {
       return (
        <Plot divId="umapPlot" data={this.state.plotData}
            layout={{
                annotations: this.state.plotAnnotations,
                width: this.state.plotWidth,
                height: this.state.plotHeight,
                showlegend: false,
                yaxis: { zeroline: false, showgrid: false, showline: true },
                xaxis: { zeroline: false, showgrid: false, showline: true },
                autosize: false,
                hovermode: 'closest',
                dragmode: 'pan',
                margin: {
                    l: 25,
                    r: 25,
                    b: 25,
                    t: 25,
                    pad: 4
                }
            }}
            config={{
                displaylogo: false,
                toImageButtonOptions: { filename: 'export-umap.png' },
                modeBarButtonsToRemove: ['hoverCompareCartesian', 'hoverClosestCartesian', 'zoom2d', 'toggleSpikelines', 'toggleHover', 'select2d', 'lasso2d']
            }}
        />

       );
    }
}

export default UMAP;