import { Spinner } from "reactstrap";
import React, { Component } from 'react';
import Plotly from '../../helpers/Plotly';
import createPlotlyComponent from 'react-plotly.js/factory';
import { Col } from 'reactstrap';
import { addAbsLegendValues } from './LMDPlotHelper';
const Plot = createPlotlyComponent(Plotly);

class LMDDotPlot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            plotData: [],
            legendPlotData: [],
            isLoading: false,
        };
        this.setData(props.data);
        this.minBubbleSize = 3;
    }

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            this.setState({ isLoading: true });
            this.setData(this.props.data);
        }
    }

    getSizeRef = (valueArr) => {
        return 2.0 * Math.max(...valueArr) / (40 ** 2)
    };

    flattenResults = (resultObj) => {
        let resultArr = [];
        for (const [key, value] of Object.entries(resultObj)) {
            if (key !== '__typename') {
                resultArr = resultArr.concat(value)
            }
        }
        return resultArr;
    };

    sortByTissueFunc = (resultA, resultB) => {
        let tissueMap = new Map([['all', 4], ['hrt', 3], ['aki', 2], ['ckd', 1]]);
        return (tissueMap.get(resultA.enrollmentCategory) - tissueMap.get(resultB.enrollmentCategory));
    };

    getSizeLegendPlot = (bubbles) => {
        let max = Math.max(...bubbles);
        let min = Math.min(...bubbles);
        let middle = ((max - min)) / 2 + min;
        let topQ = ((max - middle) / 2) + middle;
        let bottomQ = ((middle - min)) / 2 + min;
        let sizeValues = [max, topQ, middle, bottomQ, min];
        let plotObj = {
            x: sizeValues.map(element => element * 0),
            y: sizeValues,
            type: 'scatter',
            mode: 'markers',
            marker: {
                size: sizeValues,
                sizemode: 'area',
                sizeref: this.getSizeRef(bubbles),
                symbol: 'circle',
                color: 'black',
                sizemin: this.minBubbleSize
            }
        };
        return plotObj;

    };

    abbreviate = (enrollmentCategory) => {
        return enrollmentCategory === 'Healthy Reference'?'hrt':enrollmentCategory;
    };

    setData = (data) => {
        let plotObj = {};
        let legendPlotObj = {};
        let xValues = [];
        let yValues = [];
        let bubbles = [];
        let colors = [];

        let resultArr = this.flattenResults(data).sort(this.sortByTissueFunc);

        if (data) {
            resultArr.forEach((row) => {
                xValues.push(row.segment);
                yValues.push(this.abbreviate(row.enrollmentCategory).toUpperCase());
                let pValLog10 = row.pValLog10
                if(this.props.calcLog10) {
                    pValLog10 = -1 * Math.log10(row.pValLog10);
                }
                bubbles.push(pValLog10);
                colors.push(row.foldChange);
            });
            plotObj = {
                x: xValues,
                y: yValues,
                type: 'scatter',
                mode: 'markers',
                name: 'RTDotPlot',
                marker: {
                    size: bubbles,
                    sizemode: 'area',
                    sizeref: this.getSizeRef(bubbles),
                    symbol: 'circle',
                    colorscale: 'RdBu',
                    showscale: true,
                    sizemin: this.minBubbleSize,
                    reversescale: false,
                    color: colors,
                    colorbar: { title: 'log2 (Fold Change)' },
                    line: { width: 1, color: 'DarkSlateGrey'}
                }
            };
            legendPlotObj = this.getSizeLegendPlot(bubbles);
            plotObj = addAbsLegendValues(plotObj);
            this.setState({ isLoading: false })
        } else {
            this.setState({ isLoading: true });
        }
        this.setState({ plotData: [plotObj], legendPlotData: [legendPlotObj] });

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
                <React.Fragment>
                    <Col xs={10} id='lmdPlot' className='pe-0 me-0'>
                        <Plot divId="lmdPlotCanvas" data={this.state.plotData}
                            layout={{
                                xaxis: {
                                    showgrid: false
                                },
                                autosize: true,
                                colorbar:
                                    { title: 'log2' },
                                margin: {
                                    r: 0,
                                    l: 35
                                }
                            }}
                            config={{
                                displayModeBar: false,
                                staticPlot: true,
                                responsive: true
                            }}
                            style={{ width: "100%", height: "100%" }}
                            useResizeHandler={true}
                        />
                    </Col>
                    <Col xs={2} id='lmdLegendPlot' className='mt-4 ps-0 text-start'>
                        <Plot divId="lmdLegendPlotCanvas" data={this.state.legendPlotData}
                            layout={{
                                autosize: true,
                                title: {
                                    text: '-log10 (pval)',
                                    font: { size: 12 },
                                    yref: 'paper',
                                    y: 1,
                                    xref: 'paper',
                                    x: 0.8,
                                    xanchor: 'center',
                                    pad: { b: 10 },
                                    yanchor: 'bottom'
                                },
                                margin: {
                                    l: 0,
                                    r: 22,
                                    t: 108,
                                    pad: 0
                                },
                                yaxis: { zeroline: false, showgrid: true, showline: true, side: 'right', automargin: true },
                                xaxis: { zeroline: false, showgrid: false, showline: false, visible: false },
                            }}
                            config={{
                                displayModeBar: false,
                                staticPlot: true,
                                responsive: true
                            }}
                            style={{ width: "100%", height: "100%" }}
                            useResizeHandler={true}
                        />
                    </Col>
                </React.Fragment>
            )
        }
    }
}

export default LMDDotPlot;
