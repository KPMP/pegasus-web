import React, {Component} from 'react';
import Plotly from '../../helpers/Plotly';
import createPlotlyComponent from 'react-plotly.js/factory';
import {Spinner} from "reactstrap";
import {formatDataType, formatTissueType} from "../../helpers/Utils";
const Plot = createPlotlyComponent(Plotly);

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
                    name: '',
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

    getExportFilename = () => {
        const tissueType = formatTissueType(this.props.tissueType).toLowerCase().replace(" ", "-");
        return "KPMP_" + formatDataType(this.props.dataType) + '_feature-plot_' + this.props.gene + '_' + tissueType;
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
                          toImageButtonOptions: { filename: this.getExportFilename() },
                          modeBarButtonsToRemove: ['hoverCompareCartesian', 'hoverClosestCartesian', 'zoom2d', 'toggleSpikelines', 'toggleHover', 'select2d', 'lasso2d']}}
                />
            )
        }
    }
}

export default FeaturePlot;