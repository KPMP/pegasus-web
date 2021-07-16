import React, { Component } from 'react';
import Plotly from '../../helpers/Plotly';
import createPlotlyComponent from 'react-plotly.js/factory';
import initialState from '../../initialState';
import { trackClickEvent } from '../../helpers/googleAnalyticsHelper';

const Plot = createPlotlyComponent(Plotly);

class SamplesPlot extends Component {

    constructor(props) {
        super(props);
        this.reactTable = React.createRef();

        this.state = {
            summary: initialState.summary
        };
        this.trackClickEvent = trackClickEvent.bind(this);
    }

    componentDidMount() {
        this.loadSVGBars()
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
                separatorLine_01.setAttribute("d", "M 15 100 L 250 100");
                separatorLine_01.style.stroke = strokeColor;
                separatorLine_01.style.strokeWidth = strokeWidth;
                svg.appendChild(separatorLine_01);

                let separatorLine_02 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                separatorLine_02.setAttribute("d", "M 15 200 L 250 200");
                separatorLine_02.style.stroke = strokeColor;
                separatorLine_02.style.strokeWidth = strokeWidth;
                svg.appendChild(separatorLine_02);


                let separatorLine_03 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                separatorLine_03.setAttribute("d", "M 15 300 L 250 300");
                separatorLine_03.style.stroke = strokeColor;
                separatorLine_03.style.strokeWidth = strokeWidth;
                svg.appendChild(separatorLine_03);


                let separatorLine_04 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                separatorLine_04.setAttribute("d", "M 15 400 L 250 400");
                separatorLine_04.style.stroke = strokeColor;
                separatorLine_04.style.strokeWidth = strokeWidth;
                svg.appendChild(separatorLine_04);

                let separatorLine_05 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                separatorLine_05.setAttribute("d", "M 15 433 L 250 433");
                separatorLine_05.style.stroke = strokeColor;
                separatorLine_05.style.strokeWidth = strokeWidth;
                svg.appendChild(separatorLine_05);
            }
        }, 50)
    }
    render() {
        var data = [{
            type: 'bar',
            x: [440, 66, 51, 210, 56, 51, 48, 89, 5, 8, 4, 4, 400, 103, 2].reverse(),
            marker: { color: 'rgb(40, 60, 94)' },
            text: [440, 66, 51, 210, 56, 51, 48, 89, 5, 8, 4, 4, 400, 103, 2].reverse(),
            textposition: 'outside',
            yaxis: 'y2',
            y: [
                `<script  type="text/ecmascript"> <![CDATA[
                    function trackClickEvent(clickEvent, label) {
                        console.log(clickEvent, label)
                    }
                ]]>
                </script>`,
                `<a onClick={trackClickEvent('repository', 'snRNA-seq FASTQs')} href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"data_format","value":["fastq"]}},{"op":"in","content":{"field":"experimental_strategy","value":["Single-nucleus RNA-Seq"]}}]}'>snRNA-seq FASTQs</a><span>*</span>`,
                `<a onClick={this.trackClickEvent('repository', 'snRNA-seq BAMs')} href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"data_format","value":["bam"]}},{"op":"in","content":{"field":"experimental_strategy","value":["Single-nucleus RNA-Seq"]}}]}'>snRNA-seq BAMs</a><span>*</span>`,
                `<a onClick={this.trackClickEvent('repository', 'snRNA-seq expression matrices')} href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"experimental_strategy","value":["Single-nucleus RNA-Seq"]}},{"op":"in","content":{"field":"workflow_type","value":["Expression Matrix"]}}]}'>snRNA-seq expression matrices</a>`,
                `<a onClick={this.trackClickEvent('repository', 'scRNA-seq FASTQs')} href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"data_format","value":["fastq"]}},{"op":"in","content":{"field":"experimental_strategy","value":["Single-cell RNA-Seq"]}}]}'>scRNA-seq FASTQs</a><span>*</span>`,
                `<a onClick={this.trackClickEvent('repository', 'scRNA-seq BAMs')} href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"data_format","value":["bam"]}},{"op":"in","content":{"field":"experimental_strategy","value":["Single-cell RNA-Seq"]}}]}'>scRNA-seq BAMs</a><span>*</span>`,
                `<a onClick={this.trackClickEvent('repository', 'scRNA-seq expression matrices')} href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"experimental_strategy","value":["Single-cell RNA-Seq"]}},{"op":"in","content":{"field":"workflow_type","value":["Expression Matrix"]}}]}'>scRNA-seq expression matrices</a>`,
                `<a onClick={this.trackClickEvent('repository', 'LMD RNA-seq FASTQs')} href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"data_format","value":["fastq"]}},{"op":"in","content":{"field":"experimental_strategy","value":["Sub-segmental LMD Transcriptomics"]}}]}'>LMD RNA-seq FASTQs</a><span>*</span>`,
                `<a onClick={this.trackClickEvent('repository', 'LMD RNA-seq BAMs')} href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"data_format","value":["bam"]}},{"op":"in","content":{"field":"experimental_strategy","value":["Sub-segmental LMD Transcriptomics"]}}]}'>LMD RNA-seq BAMs</a><span>*</span>`,
                `<a onClick={this.trackClickEvent('repository', 'LMD RNA-seq expression matrices')} href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"experimental_strategy","value":["Sub-segmental LMD Transcriptomics"]}},{"op":"in","content":{"field":"workflow_type","value":["Non-normalized Expression Matrix","Normalized Expression Matrix"]}}]}'>LMD RNA-seq expression matrices</a>`,

                `<a onClick={this.trackClickEvent('repository', 'Bulk RNA-seq FASTQs')} href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"data_format","value":["fastq"]}},{"op":"in","content":{"field":"experimental_strategy","value":["Bulk Total/mRNA"]}}]}'>Bulk RNA-seq FASTQs</a><span>*</span>`,
                `<a onClick={this.trackClickEvent('repository', 'Bulk RNA-seq BAMs')} href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"data_format","value":["bam"]}},{"op":"in","content":{"field":"experimental_strategy","value":["Bulk Total/mRNA"]}}]}'>Bulk RNA-seq BAMs</a><span>*</span>`,
                `<a onClick={this.trackClickEvent('repository', 'Bulk RNA-seq expression matrices')} href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"experimental_strategy","value":["Bulk Total/mRNA"]}},{"op":"in","content":{"field":"workflow_type","value":["Non-normalized Expression Matrix"]}}]}'>Bulk RNA-seq expression matrices</a>`,
                `<a onClick={this.trackClickEvent('repository', 'Light microscopic whole slide images')} href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"experimental_strategy","value":["Light Microscopic Whole Slide Images"]}}]}'>Light microscopic whole slide images</a>`,
                `<a onClick={this.trackClickEvent('repository', 'Experiment metadata')} href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"workflow_type","value":["Experimental Metadata"]}}]}'>Experiment metadata</a>`,
                `<a onClick={this.trackClickEvent('repository', 'Clinical dataset')} href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"data_type","value":["Clinical Study Data"]}}]}'>Clinical dataset</a>`,

            ].reverse(),
            orientation: 'h'
        }];

        return (
            <div>
                <div className="row tightrow">
                    <div className="samples-plot">
                        <Plot
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
                                    domain: [0.35, 1],
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