import React, { Component } from 'react';
import Plotly from '../../helpers/Plotly';
import createPlotlyComponent from 'react-plotly.js/factory';
import initialState from '../../initialState';
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';

const Plot = createPlotlyComponent(Plotly);

class SamplesPlot extends Component {

    constructor(props) {
        super(props);
        this.reactTable = React.createRef();

        this.state = {
            summary: initialState.summary
        };
        this.handleGoogleAnalyticsEvent = handleGoogleAnalyticsEvent.bind(this);
    }

    componentDidMount() {
        this.loadSVGBars();
    }

    

    loadSVGBars() {
        let svg;
        // Interval as plotly renders the svg _slightly_ after component mount
        let svgCheck = setInterval(() => {
            svg = document.getElementsByClassName('samples-plot')[0].getElementsByTagName('svg')[0]
            if (svg) {
                clearInterval(svgCheck);
                let strokeColor = "#ccc";
                let strokeWidth = "2px";
                let separatorLine_01 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                separatorLine_01.setAttribute("d", "M 15 90 L 250 90");
                separatorLine_01.style.stroke = strokeColor;
                separatorLine_01.style.strokeWidth = strokeWidth;
                svg.appendChild(separatorLine_01);

                let separatorLine_02 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                separatorLine_02.setAttribute("d", "M 15 182 L 250 182");
                separatorLine_02.style.stroke = strokeColor;
                separatorLine_02.style.strokeWidth = strokeWidth;
                svg.appendChild(separatorLine_02);


                let separatorLine_03 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                separatorLine_03.setAttribute("d", "M 15 272 L 250 272");
                separatorLine_03.style.stroke = strokeColor;
                separatorLine_03.style.strokeWidth = strokeWidth;
                svg.appendChild(separatorLine_03);


                let separatorLine_04 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                separatorLine_04.setAttribute("d", "M 15 340 L 250 340");
                separatorLine_04.style.stroke = strokeColor;
                separatorLine_04.style.strokeWidth = strokeWidth;
                svg.appendChild(separatorLine_04);

                let separatorLine_05 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                separatorLine_05.setAttribute("d", "M 15 430 L 250 430");
                separatorLine_05.style.stroke = strokeColor;
                separatorLine_05.style.strokeWidth = strokeWidth;
                svg.appendChild(separatorLine_05);

                let separatorLine_06 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                separatorLine_06.setAttribute("d", "M 15 454 L 250 454");
                separatorLine_06.style.stroke = strokeColor;
                separatorLine_06.style.strokeWidth = strokeWidth;
                svg.appendChild(separatorLine_06);

                let separatorLine_07 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                separatorLine_07.setAttribute("d", "M 15 477 L 250 477");
                separatorLine_07.style.stroke = strokeColor;
                separatorLine_07.style.strokeWidth = strokeWidth;
                svg.appendChild(separatorLine_07);
            }
        }, 50)
    }
    render() {
        var data = [{
            type: 'bar',
            x: [652, 100, 85, 2, 380, 74, 69, 2, 48, 89, 5, 1, 8, 4, 4, 14, 14, 14, 14, 1100, 155, 1].reverse(),
            marker: { color: 'rgb(40, 60, 94)' },
            text: [652, 100, 85, 2, 380, 74, 69, 2, 48, 89, 5, 1, 8, 4, 4, 14, 14, 14, 14, 1100, 155, 1].reverse(),
            textposition: 'outside',
            yaxis: 'y2',
            y: [
                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"data_format","value":["fastq"]}},{"op":"in","content":{"field":"experimental_strategy","value":["Single-nucleus RNA-Seq"]}}]}'>snRNA-seq FASTQs</a><span>*</span>`,
                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"data_format","value":["bam"]}},{"op":"in","content":{"field":"experimental_strategy","value":["Single-nucleus RNA-Seq"]}}]}'>snRNA-seq BAMs</a><span>*</span>`,
                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"experimental_strategy","value":["Single-nucleus RNA-Seq"]}},{"op":"in","content":{"field":"workflow_type","value":["Expression Matrix"]}}]}'>snRNA-seq expression matrices</a>`,
                `<a href='/repository/?facetTab=files&filters=%7B%22op%22%3A%22and%22%2C%22content%22%3A%5B%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22experimental_strategy%22%2C%22value%22%3A%5B%22Single-nucleus%20RNA-Seq%22%5D%7D%7D%2C%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22workflow_type%22%2C%22value%22%3A%5B%22Aggregated%20Clustered%20Data%22%5D%7D%7D%5D%7D'>snRNA-Seq aggregated clustered data</a>`,
                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"data_format","value":["fastq"]}},{"op":"in","content":{"field":"experimental_strategy","value":["Single-cell RNA-Seq"]}}]}'>scRNA-seq FASTQs</a><span>*</span>`,
                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"data_format","value":["bam"]}},{"op":"in","content":{"field":"experimental_strategy","value":["Single-cell RNA-Seq"]}}]}'>scRNA-seq BAMs</a><span>*</span>`,
                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"experimental_strategy","value":["Single-cell RNA-Seq"]}},{"op":"in","content":{"field":"workflow_type","value":["Expression Matrix"]}}]}'>scRNA-seq expression matrices</a>`,
                `<a href='/repository/?facetTab=files&filters=%7B%22op%22%3A%22and%22%2C%22content%22%3A%5B%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22experimental_strategy%22%2C%22value%22%3A%5B%22Single-cell%20RNA-Seq%22%5D%7D%7D%2C%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22workflow_type%22%2C%22value%22%3A%5B%22Aggregated%20Clustered%20Data%22%5D%7D%7D%5D%7D'>scRNA-Seq aggregated clustered data</a>`,
                `<a href='/repository/?facetTab=files&filters=%7B%22op%22%3A%22and%22%2C%22content%22%3A%5B%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22data_format%22%2C%22value%22%3A%5B%22fastq%22%5D%7D%7D%2C%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22experimental_strategy%22%2C%22value%22%3A%5B%22Regional%20Transcriptomics%22%5D%7D%7D%5D%7D'>LMD RNA-seq FASTQs</a><span>*</span>`,
                `<a href='/repository/?facetTab=files&filters=%7B%22op%22%3A%22and%22%2C%22content%22%3A%5B%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22data_format%22%2C%22value%22%3A%5B%22bam%22%5D%7D%7D%2C%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22experimental_strategy%22%2C%22value%22%3A%5B%22Regional%20Transcriptomics%22%5D%7D%7D%5D%7D'>LMD RNA-seq BAMs</a><span>*</span>`,
                `<a href='/repository/?facetTab=files&filters=%7B%22op%22%3A%22and%22%2C%22content%22%3A%5B%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22experimental_strategy%22%2C%22value%22%3A%5B%22Regional%20Transcriptomics%22%5D%7D%7D%2C%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22workflow_type%22%2C%22value%22%3A%5B%22Non-normalized%20Expression%20Matrix%22%2C%22Normalized%20Expression%20Matrix%22%5D%7D%7D%5D%7D'>LMD RNA-seq expression matrices</a>`,
                `<a href='/repository/?facetTab=files&filters=%7B%22op%22%3A%22and%22%2C%22content%22%3A%5B%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22experimental_strategy%22%2C%22value%22%3A%5B%22Regional%20Transcriptomics%22%5D%7D%7D%2C%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22workflow_type%22%2C%22value%22%3A%5B%22Aggregated%20Data%22%5D%7D%7D%5D%7D'>LMD RNA-Seq aggregated data</a>`,
                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"data_format","value":["fastq"]}},{"op":"in","content":{"field":"experimental_strategy","value":["Bulk Total/mRNA"]}}]}'>Bulk RNA-seq FASTQs</a><span>*</span>`,
                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"data_format","value":["bam"]}},{"op":"in","content":{"field":"experimental_strategy","value":["Bulk Total/mRNA"]}}]}'>Bulk RNA-seq BAMs</a><span>*</span>`,
                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"experimental_strategy","value":["Bulk Total/mRNA"]}},{"op":"in","content":{"field":"workflow_type","value":["Non-normalized Expression Matrix"]}}]}'>Bulk RNA-seq expression matrices</a>`,
                `<a href='/repository/?facetTab=files&filters=%7B%22op%22%3A%22and%22%2C%22content%22%3A%5B%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22workflow_type%22%2C%22value%22%3A%5B%22RGB%20max%20proj%20of%208-ch%20IF%20image%20volume%22%5D%7D%7D%5D%7D'>3D imaging 8-ch RGB max projection</a>`,
                `<a href='/repository/?facetTab=files&filters=%7B%22op%22%3A%22and%22%2C%22content%22%3A%5B%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22workflow_type%22%2C%22value%22%3A%5B%22Composite%20max%20proj%20of%208-ch%20IF%20image%20volume%22%5D%7D%7D%5D%7D'>3D imaging 8-ch composite max projection</a>`,
                `<a href='/repository/?facetTab=files&filters=%7B%22op%22%3A%22and%22%2C%22content%22%3A%5B%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22workflow_type%22%2C%22value%22%3A%5B%22Composite%203D%208-ch%20IF%20image%20volume%22%5D%7D%7D%5D%7D'>3D imaging 8-ch composite 3D</a>`,
                `<a href='/repository/?facetTab=files&filters=%7B%22op%22%3A%22and%22%2C%22content%22%3A%5B%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22workflow_type%22%2C%22value%22%3A%5B%22RGB%20max%20proj%20of%202-ch%20%28autofluorescence%20and%20second%20harmonic%20generation%29%20image%20volume%22%5D%7D%7D%5D%7D'>3D imaging 2-ch RGB max projection</a>`,
                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"experimental_strategy","value":["Light Microscopic Whole Slide Images"]}}]}'>Light microscopic whole slide images</a>`,
                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"workflow_type","value":["Experimental Metadata"]}}]}'>Experiment metadata</a>`,
                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"data_type","value":["Clinical Study Data"]}}]}'>Clinical dataset</a>`,

            ].reverse(),
            orientation: 'h'
        }];

        return (
            <div>
                <div className="row tightrow">
                    <div className="samples-plot">
                        <Plot
                            id='samples-plot'
                            data={data}
                            layout={{
                                autosize: false,
                                width: 815,
                                height: 500,
                                textposition: 'auto',
                                margin: {
                                    l: 0,
                                    r: 0,
                                    b: 0,
                                    t: 0,
                                    pad: 0
                                },
                                hovermode: false,
                                xaxis: {
                                    range: [0, 1200],
                                    domain: [0.37, 1.3],
                                    showticklabels: false,
                                    zerolinecolor: '#cccccc',
                                    showgrid: false,
                                    showline: true,
                                    align: 'left',
                                    automargin: true
                                },
                                yaxis2: {
                                    anchor: 'free',
                                    showgrid: false,
                                    position: 0.02,
                                    side: 'right'
                                }
                            }}
                            config={{ displayModeBar: false, staticPlot: true }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default SamplesPlot;