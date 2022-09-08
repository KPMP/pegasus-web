import React, { Component } from 'react';
import Plotly from '../../helpers/Plotly';
import createPlotlyComponent from 'react-plotly.js/factory';
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';

const Plot = createPlotlyComponent(Plotly);

class SamplesPlot extends Component {

    constructor(props) {
        super(props);
        this.reactTable = React.createRef();
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
                separatorLine_01.setAttribute("d", "M 15 66 L 295 66");
                separatorLine_01.style.stroke = strokeColor;
                separatorLine_01.style.strokeWidth = strokeWidth;
                svg.appendChild(separatorLine_01);

                let separatorLine_02 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                separatorLine_02.setAttribute("d", "M 15 116 L 295 116");
                separatorLine_02.style.stroke = strokeColor;
                separatorLine_02.style.strokeWidth = strokeWidth;
                svg.appendChild(separatorLine_02);


                let separatorLine_03 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                separatorLine_03.setAttribute("d", "M 15 133 L 295 133");
                separatorLine_03.style.stroke = strokeColor;
                separatorLine_03.style.strokeWidth = strokeWidth;
                svg.appendChild(separatorLine_03);


                let separatorLine_04 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                separatorLine_04.setAttribute("d", "M 15 166 L 295 166");
                separatorLine_04.style.stroke = strokeColor;
                separatorLine_04.style.strokeWidth = strokeWidth;
                svg.appendChild(separatorLine_04);

                let separatorLine_05 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                separatorLine_05.setAttribute("d", "M 15 183 L 295 183");
                separatorLine_05.style.stroke = strokeColor;
                separatorLine_05.style.strokeWidth = strokeWidth;
                svg.appendChild(separatorLine_05);

                let separatorLine_06 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                separatorLine_06.setAttribute("d", "M 15 200 L 295 200");
                separatorLine_06.style.stroke = strokeColor;
                separatorLine_06.style.strokeWidth = strokeWidth;
                svg.appendChild(separatorLine_06);

                let separatorLine_07 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                separatorLine_07.setAttribute("d", "M 15 266 L 295 266");
                separatorLine_07.style.stroke = strokeColor;
                separatorLine_07.style.strokeWidth = strokeWidth;
                svg.appendChild(separatorLine_07);

                let separatorLine_08 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                separatorLine_08.setAttribute("d", "M 15 333 L 295 333");
                separatorLine_08.style.stroke = strokeColor;
                separatorLine_08.style.strokeWidth = strokeWidth;
                svg.appendChild(separatorLine_08);

                let separatorLine_09 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                separatorLine_09.setAttribute("d", "M 15 400 L 295 400");
                separatorLine_09.style.stroke = strokeColor;
                separatorLine_09.style.strokeWidth = strokeWidth;
                svg.appendChild(separatorLine_09);

                let separatorLine_10 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                separatorLine_10.setAttribute("d", "M 15 499 L 295 499");
                separatorLine_10.style.stroke = strokeColor;
                separatorLine_10.style.strokeWidth = strokeWidth;
                svg.appendChild(separatorLine_10);
            }
        }, 50)
    }
    render() {
        // the reverse is needed to get the correct ordering due to the way Plotly renders data
        var data = [{
            type: 'bar',
            x: [14, 14, 14, 14, 8, 4, 4, 1, 11, 21, 155, 1100, 48, 49, 5, 1, 380, 74, 69, 2, 652, 100, 85, 2, 32, 16, 16, 16, 16, 16].reverse(),
            marker: { color: 'rgb(40, 60, 94)' },
            text: [14, 14, 14, 14, 8, 4, 4, 1, 11, 21, 155, 1100, 48, 49, 5, 1, 380, 74, 69, 2, 652, 100, 85, 2, 32, 16, 16, 16, 16, 16].reverse(),
            textposition: 'outside',
            yaxis: 'y2',
            y: [
                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"experimental_strategy","value":["3D Tissue Imaging and Cytometry"]}},{"op":"in","content":{"field":"workflow_type","value":["RGB max proj of 8-ch IF image volume"]}}]}'>3D imaging 8-ch RGB max projection</a>`,
                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"experimental_strategy","value":["3D Tissue Imaging and Cytometry"]}},{"op":"in","content":{"field":"workflow_type","value":["Composite max proj of 8-ch IF image volume"]}}]}''>3D imaging 8-ch composite max projection</a>`,
                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"experimental_strategy","value":["3D Tissue Imaging and Cytometry"]}},{"op":"in","content":{"field":"workflow_type","value":["Composite 3D 8-ch IF image volume"]}}]}''>3D imaging 8-ch composite 3D</a>`,
                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"experimental_strategy","value":["3D Tissue Imaging and Cytometry"]}},{"op":"in","content":{"field":"workflow_type","value":["RGB max proj of 2-ch (autofluorescence and second harmonic generation) image volume"]}}]}''>3D imaging 2-ch RGB max projection</a>`,

                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"data_format","value":["fastq"]}},{"op":"in","content":{"field":"experimental_strategy","value":["Bulk Total/mRNA"]}}]}'>Bulk RNA-seq FASTQs</a><span>*</span>`,
                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"data_format","value":["bam"]}},{"op":"in","content":{"field":"experimental_strategy","value":["Bulk Total/mRNA"]}}]}'>Bulk RNA-seq BAMs</a><span>*</span>`,
                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"experimental_strategy","value":["Bulk Total/mRNA"]}},{"op":"in","content":{"field":"workflow_type","value":["Non-normalized Expression Matrix"]}}]}'>Bulk RNA-seq expression matrices</a>`,

                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"data_type","value":["Clinical Study Data"]}}]}'>Clinical dataset</a>`,

                `<a href='/repository/?facetTab=files&filters=%7B%22op%22:%22and%22,%22content%22:%5B%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22experimental_strategy%22,%22value%22:%5B%22CODEX%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22workflow_type%22,%22value%22:%5B%22Expression%20Matrix%22%5D%7D%7D%5D%7D'>CODEX expression matrices</a>`,
                `<a href='/repository/?facetTab=files&filters=%7B%22op%22%3A%22and%22%2C%22content%22%3A%5B%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22experimental_strategy%22%2C%22value%22%3A%5B%22CODEX%22%5D%7D%7D%2C%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22data_format%22%2C%22value%22%3A%5B%22zip%22%5D%7D%7D%5D%7D'>CODEX region files</a>`,

                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"workflow_type","value":["Experimental Metadata"]}}]}'>Experiment metadata</a>`,

                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"experimental_strategy","value":["Light Microscopic Whole Slide Images"]}}]}'>Light microscopic whole slide images</a>`,

                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"data_format","value":["fastq"]}},{"op":"in","content":{"field":"experimental_strategy","value":["Regional Transcriptomics"]}}]}'>LMD RNA-seq FASTQs</a><span>*</span>`,
                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"data_format","value":["bam"]}},{"op":"in","content":{"field":"experimental_strategy","value":["Regional Transcriptomics"]}}]}'>LMD RNA-seq BAMs</a><span>*</span>`,
                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"experimental_strategy","value":["Regional Transcriptomics"]}},{"op":"in","content":{"field":"workflow_type","value":["Non-normalized Expression Matrix","Normalized Expression Matrix"]}}]}'>LMD RNA-seq expression matrices</a>`,
                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"experimental_strategy","value":["Regional Transcriptomics"]}},{"op":"in","content":{"field":"workflow_type","value":["Aggregated Data"]}}]}'>LMD RNA-Seq aggregated data</a>`,

                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"data_format","value":["fastq"]}},{"op":"in","content":{"field":"experimental_strategy","value":["Single-cell RNA-Seq"]}}]}'>scRNA-seq FASTQs</a><span>*</span>`,
                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"data_format","value":["bam"]}},{"op":"in","content":{"field":"experimental_strategy","value":["Single-cell RNA-Seq"]}}]}'>scRNA-seq BAMs</a><span>*</span>`,
                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"experimental_strategy","value":["Single-cell RNA-Seq"]}},{"op":"in","content":{"field":"workflow_type","value":["Expression Matrix"]}}]}'>scRNA-seq expression matrices</a>`,
                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"experimental_strategy","value":["Single-cell RNA-Seq"]}},{"op":"in","content":{"field":"workflow_type","value":["Aggregated Clustered Data"]}}]}'>scRNA-Seq aggregated clustered data</a>`,

                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"data_format","value":["fastq"]}},{"op":"in","content":{"field":"experimental_strategy","value":["Single-nucleus RNA-Seq"]}}]}'>snRNA-seq FASTQs</a><span>*</span>`,
                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"data_format","value":["bam"]}},{"op":"in","content":{"field":"experimental_strategy","value":["Single-nucleus RNA-Seq"]}}]}'>snRNA-seq BAMs</a><span>*</span>`,
                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"experimental_strategy","value":["Single-nucleus RNA-Seq"]}},{"op":"in","content":{"field":"workflow_type","value":["Expression Matrix"]}}]}'>snRNA-seq expression matrices</a>`,
                `<a href='/repository/?facetTab=files&filters={"op":"and","content":[{"op":"in","content":{"field":"experimental_strategy","value":["Single-nucleus RNA-Seq"]}},{"op":"in","content":{"field":"workflow_type","value":["Aggregated Clustered Data"]}}]}'>snRNA-Seq aggregated clustered data</a>`,

                `<a href='/repository/?facetTab=files&filters=%7B%22op%22:%22and%22,%22content%22:%5B%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22data_format%22,%22value%22:%5B%22h5ad%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22experimental_strategy%22,%22value%22:%5B%22Spatial%20Transcriptomics%22%5D%7D%7D%5D%7D'>Spatial Transcriptomics anndata file</a>`,
                `<a href='/repository/?facetTab=files&filters=%7B%22op%22:%22and%22,%22content%22:%5B%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22data_format%22,%22value%22:%5B%22bam%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22experimental_strategy%22,%22value%22:%5B%22Spatial%20Transcriptomics%22%5D%7D%7D%5D%7D'>Spatial Transcriptomics BAMs</a><span>*</span>`,
                `<a href='/repository/?facetTab=files&filters=%7B%22op%22:%22and%22,%22content%22:%5B%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22data_format%22,%22value%22:%5B%22cloupe%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22experimental_strategy%22,%22value%22:%5B%22Spatial%20Transcriptomics%22%5D%7D%7D%5D%7D'>Spatial Transcriptomics cloupe file</a>`,
                `<a href='/repository/?facetTab=files&filters=%7B%22op%22:%22and%22,%22content%22:%5B%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22experimental_strategy%22,%22value%22:%5B%22Spatial%20Transcriptomics%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22workflow_type%22,%22value%22:%5B%22Expression%20Matrix%22%5D%7D%7D%5D%7D'>Spatial Transcriptomics expression matrices</a>`,
                `<a href='/repository/?facetTab=files&filters=%7B%22op%22:%22and%22,%22content%22:%5B%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22data_format%22,%22value%22:%5B%22fastq%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22experimental_strategy%22,%22value%22:%5B%22Spatial%20Transcriptomics%22%5D%7D%7D%5D%7D'>Spatial Transcriptomics FASTQs</a><span>*</span>`,
                `<a href='/repository/?facetTab=files&filters=%7B%22op%22:%22and%22,%22content%22:%5B%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22data_format%22,%22value%22:%5B%22tif%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22experimental_strategy%22,%22value%22:%5B%22Spatial%20Transcriptomics%22%5D%7D%7D%5D%7D'>Spatial Transcriptomics whole slide image</a>`,
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
                                    domain: [0.39, 1.3],
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