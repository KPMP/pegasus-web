import {Spinner} from "reactstrap";
import React, {Component} from 'react';
import Plotly from '../../helpers/Plotly';
import createPlotlyComponent from 'react-plotly.js/factory';
import { Col } from 'reactstrap';
const Plot = createPlotlyComponent(Plotly);

class LMDDotPlot extends Component {

    constructor(props) {
        super(props);
        let { plotHeight, plotWidth } = this.getPlotSize();
        let { legendPlotHeight, legendPlotWidth } = this.getLegendPlotSize();
        this.state = {
            plotData: [],
            legendPlotData: [],
            isLoading: false,
            plotHeight: plotHeight,
            plotWidth: plotWidth,
            legendPlotHeight: legendPlotHeight,
            legendPlotWidth: legendPlotWidth
        };
        this.setData(props.data);
    }

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            this.setState({ isLoading: true });
            this.setData(this.props.data);
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this.setPlotSize);
    }

    componentWillUnmount() {
        window.addEventListener("resize", null);
    }

    setPlotSize = () => {
        let { plotHeight, plotWidth } = this.getPlotSize();
        let { legendPlotHeight, legendPlotWidth } = this.getLegendPlotSize();
        this.setState({ plotHeight, plotWidth, legendPlotHeight, legendPlotWidth })
    };

    getPlotSize = (plotSize, event) => {

        if (window.innerWidth > 1197) {
            return { plotHeight: 450, plotWidth: 700 };
        } else if (window.innerWidth > 991 && window.innerWidth <= 1197) {
            return { plotHeight: 400, plotWidth: 650 }
        } else if (window.innerWidth > 767 && window.innerWidth <= 991) {
            return { plotHeight: 400, plotWidth: 650 }
        } else if (window.innerWidth > 508 && window.innerWidth <= 767) {
            return { plotHeight: 290, plotWidth: 450 }
        } else if (window.innerWidth > 408 && window.innerWidth <= 508) {
            return { plotHeight: 290, plotWidth: 450 }
        } else if (window.innerWidth > 0 && window.innerWidth <= 408) {
            return { plotHeight: 290, plotWidth: 450 }
        }
    };

    getLegendPlotSize = (plotSize, event) => {

        if (window.innerWidth > 1197) {
            return { legendPlotHeight: 410, legendPlotWidth: 195 };
        } else if (window.innerWidth > 991 && window.innerWidth <= 1197) {
            return { legendPlotHeight: 360, legendPlotWidth: 145 }
        } else if (window.innerWidth > 767 && window.innerWidth <= 991) {
            return { legendPlotHeight: 360, legendPlotWidth: 145 }
        } else if (window.innerWidth > 508 && window.innerWidth <= 767) {
            return { legendPlotHeight: 200, legendPlotWidth: 35 }
        } else if (window.innerWidth > 408 && window.innerWidth <= 508) {
            return { legendPlotHeight: 200, legendPlotWidth: 35 }
        } else if (window.innerWidth > 0 && window.innerWidth <= 408) {
            return { legendPlotHeight: 200, legendPlotWidth: 35 }
        }
    };

    getSizeRef = (valueArr) => {
        return 2.0 * Math.max(...valueArr) / (40**2)
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
        return (tissueMap.get(resultB.tissueType) - tissueMap.get(resultA.tissueType));
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
                color: 'black'
            }
        };
        return plotObj;

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
                xValues.push(row.tissueType.toUpperCase());
                yValues.push(row.segment);
                bubbles.push(row.pValLog10);
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
                    colorscale: 'Viridis',
                    showscale: true,
                    reversescale: true,
                    color: colors,
                    colorbar: { title: 'log2 (Fold Change)' }
                }
            };
            legendPlotObj = this.getSizeLegendPlot(bubbles);
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
                <Col xs={8} className='text-right pr-0 mr-0'>
                <Plot divId="lmdPlot" data={this.state.plotData}
                      layout={{
                          width: this.state.plotWidth,
                          height: this.state.plotHeight,
                          colorbar:
                              {title:'log2'},
                          margin: {
                            r:0,
                            p:0,
                              t:50
                          },

                      }}
                      config={{
                          displayModeBar: false,
                          staticPlot: true
                      }}
                />
                </Col>
                <Col xs={4} className='text-left mt-4 pl-0'>
                    <Plot divId="lmdLegendPlot" data={this.state.legendPlotData}
                          layout={{
                              title: {
                                  text: '-log10(p value)',
                                  font: { size: 12},
                                  yref: 'paper',
                                  y : 1,
                                  xref: 'paper',
                                  x: 1,
                                  pad: {b: 10},
                                  yanchor : 'bottom'
                              },
                              width: this.state.legendPlotWidth,
                              height: this.state.legendPlotHeight,
                              margin: {
                                  l: 0,
                                  r: 100,
                                  t: 58,
                                  pad: 4
                              },
                              yaxis: { zeroline: false, showgrid: true, showline: true, side: 'right' },
                              xaxis: { zeroline: false, showgrid: false, showline: false, visible: false },
                          }}
                          config={{
                              displayModeBar: false,
                              staticPlot: true
                          }}
                    />
                </Col>
                </React.Fragment>
    )
        }
    }
}

export default LMDDotPlot;