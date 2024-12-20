import React, { Component } from 'react';
import Plotly from '../../helpers/Plotly';
import createPlotlyComponent from 'react-plotly.js/factory';
import { Spinner } from "reactstrap";
import { formatDataType, formatEnrollmentCategory } from "../../helpers/Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";

const Plot = createPlotlyComponent(Plotly);

class FeaturePlot extends Component {
    constructor(props) {
        super(props);
        let { plotHeight, plotWidth } = this.getPlotSize();
        this.state = {
            plotData: [], isLoading: true,
            plotHeight: plotHeight,
            plotWidth: plotWidth,
        };
        this.setData(props.data);
        this.setPlotSize = this.setPlotSize.bind(this);

    }

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            this.setState({ isLoading: true });
            this.setData(this.props.data);
        }
        if (this.props.isLoading !== prevProps.isLoading && !this.props.isLoading && this.state !== false) {
            this.setState({ isLoading: false });
        }
    }
    componentDidMount() {
        window.addEventListener("resize", this.setPlotSize);
    }
    componentWillUnmount() {
        window.addEventListener("resize", null);
    }
    setPlotSize() {
        let { plotHeight, plotWidth } = this.getPlotSize();
        this.setState({ plotHeight, plotWidth })
    }
    getPlotSize() {
        if (window.innerWidth > 1200) {
            return { plotHeight: 600, plotWidth: 600 };
        } else if (window.innerWidth > 1197 && window.innerWidth <= 1200) {
            return { plotHeight: 450, plotWidth: 450};
        } else if (window.innerWidth > 991 && window.innerWidth <= 1197) {
            return { plotHeight: 450, plotWidth: 450 }
        } else if (window.innerWidth > 767 && window.innerWidth <= 991) {
            return { plotHeight: 600, plotWidth: 600 }
        } else if (window.innerWidth > 508 && window.innerWidth <= 767) {
            return { plotHeight: 450, plotWidth: 450 }
        } else if (window.innerWidth > 408 && window.innerWidth <= 508) {
            return { plotHeight: 300, plotWidth: 360 }
        } else if (window.innerWidth > 0 && window.innerWidth <= 408) {
            return { plotHeight: 350, plotWidth: 350 }
        }
    }

    setData(inputData) {
        let groupData = [];
        if (inputData && inputData.featureData) {
            inputData.featureData.forEach(function (group) {
                let marker = { size: 2, colorscale: 'Blackbody', showscale: true, reversescale: true };
                if (group.expression[0] !== 0) {
                    marker.color = group.expression;
                } else {
                    let grayColors = new Array(group.expression.length);
                    grayColors.fill('rgba(211,211,211,1)');
                    marker.color = grayColors;
                    marker.showscale = false;
                }
                groupData.push({
                    type: 'scattergl',
                    mode: 'markers',
                    name: '',
                    hoverinfo: 'text',
                    text: group.hoverDisplay,
                    x: group.xValues,
                    y: group.yValues,
                    marker: marker,

                });
            });
            groupData.sort((a, b) => (a.marker.showscale > b.marker.showscale) ? 1 : -1)
            this.setState({ isLoading: false })
        } else {
            this.setState({ isLoading: true });
        }

        this.setState({ plotData: groupData });

    };

    getExportFilename = () => {
        const enrollmentCategory = formatEnrollmentCategory(this.props.enrollmentCategory).toLowerCase().replace(" ", "-");
        return "KPMP_" + formatDataType(this.props.dataType) + '_feature-plot_' + this.props.gene + '_' + enrollmentCategory;
    };

    render() {
        if ((!this.state.isLoading || !this.props.isLoading)
            && Array.isArray(this.state.plotData) && this.state.plotData.length === 0) {
            return (
                <div className="expression-search-copy">
                    <FontAwesomeIcon className={"fa fa-share"} icon={faShare} />
                    <h6>Gene Expression:</h6>
                    <p>Enter a gene above to get started</p>
                </div>
            )
        } else if (Array.isArray(this.state.plotData) && this.state.plotData.length > 0 && this.state.plotData[0].text.length > 0) {
            return (
                <div>
                    <Plot divId="featurePlot" data={this.state.plotData}

                        layout={{
                            title: {
                                text: 'Expression (normalized and log transformed)',
                                font: { size: 12 },
                                yref: 'paper',
                                y: 1,
                                xref: 'paper',
                                x: 0.9,
                                xanchor: 'center',
                                pad: { b: 10 },
                                yanchor: 'bottom'
                            },
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
                            toImageButtonOptions: { filename: this.getExportFilename() },
                            modeBarButtonsToRemove: ['hoverCompareCartesian', 'hoverClosestCartesian', 'zoom2d', 'toggleSpikelines', 'toggleHover', 'select2d', 'lasso2d']
                        }}
                    />
                </div>
            )
        } else {
            return (
                <div className='viz-spinner'>
                    <Spinner color='primary' />
                </div>
            )
        }
    }
}

export default FeaturePlot;