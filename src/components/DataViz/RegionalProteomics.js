import React, { Component } from 'react';
import {Container, Row, Col, ButtonGroup, Button} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DataTypeSelectorContainer from './DataTypeSelectorContainer';
import {faShare} from "@fortawesome/free-solid-svg-icons";
import queryString from 'query-string';
import {fetchRegionalProteomics} from "../../helpers/ApolloClient";
import LMDDotPlot from "../Plots/LMDDotPlot";
import RegionalProteomicsTable from "../ExpressionTables/RegionalProteomicsTable";
import {formatTissueType} from "../../helpers/Utils";

class RegionalProteomics extends Component {
      constructor(props) {
        super(props);
        this.state = { allData: {}, accessionNums: [], selectedAccession: "", tableData: [], plotData: {}};
        const queryParam = queryString.parse(props.location.search);
        if (!this.props.tissueType) {
          this.props.setTissueType('all')
        }
        if (queryParam && queryParam.dataType) {
            this.props.resetState();
            props.setDataType('rp');
            window.open(props.location.pathname, '_self');
        }
    };

    componentDidMount() {
        if (this.props.gene.symbol) {
            this.getRPData();
        }
    };

    componentDidUpdate(prevProps, prevState, snapShot) {
        if (this.props.gene !== prevProps.gene) {
            this.getRPData();
        }
        if (this.props.tissueType !== prevProps.tissueType) {
            this.setState({ tableData: this.state.plotData[this.props.tissueType] });
        }
    };

    getRPData = () => {
        fetchRegionalProteomics(this.props.gene.symbol).then((result) => {
                this.setState({ selectedAccession: result[0]["accession"]});
                this.mapPlotData(result);
            }
        );
    };

    mapPlotData = (result) => {
        let allData = {};
        let accessionNums = [];
        for (let {accession, rpExpressionByTissueType} of result) {
            allData[accession] = rpExpressionByTissueType;
            accessionNums.push(accession);
        }
        this.setState({ allData: allData });
        this.setState({ accessionNums: accessionNums })
        let plotData = allData[this.state.selectedAccession];
        this.setState({ plotData: plotData})
        this.setState({ tableData: plotData[this.props.tissueType]})
    }

    handleAccessionChange = (accession) => {
        this.setState({ selectedAccession: accession })
        this.setState({ plotData: this.state.allData[accession]})
        this.setState({ tableData: this.state.allData[accession][this.props.tissueType]})
    }

    getTabGroup = (accessionNums) => {
        let tabs = []
        for (let accession of accessionNums) {
            tabs.push(<Button color="primary" onClick={() => this.handleAccessionChange(accession)} active={this.state.selectedAccession === accession}>{accession}</Button>)
        }
        return(<ButtonGroup>
            {tabs}
            </ButtonGroup>)
    }

    render() {
        let plot = <LMDDotPlot data={this.state.plotData} />
        let table = <RegionalProteomicsTable data={this.state.tableData}/>
        let tabs = this.getTabGroup(this.state.accessionNums);
        return (
            <div className='height-wrapper mb-3 mt-3'>
              <Container id='outer-wrapper'>
                <DataTypeSelectorContainer/>
                  {!this.props.gene.symbol ?
                      <Container className='mt-3 rounded border p-3 shadow-sm mb-5'>
                          <div className="regional-search-copy">
                              <Row xs='12'>
                                  <Col lg={{size: 1, offset: 4}}>
                                      <FontAwesomeIcon className={"fa fa-share"} icon={faShare}/>
                                  </Col>
                                  <Col lg='7'>
                                      <h6>Gene Expression:</h6>
                                      <p>Enter a gene above to get started</p>
                                  </Col>
                              </Row>
                          </div>
                      </Container>
                      : <Container className='mt-3 rounded border p-3 shadow-sm mb-5'>
                          <Row xs='12'>
                              <Col lg='12'>
                                  <h5>{this.props.gene.symbol} expression comparison across regions
                                      in all tissue types</h5>
                                  <hr/>
                              </Col>
                          </Row>
                          <Row xs='12'>
                              <Col lg='12' className='text-start lmd-plot-toggle'>
                                  <span className='d-table-cell pe-4 pb-2 text-nowrap'>Protein accession:</span>
                                  <span className='d-table-cell'>
                                        {tabs}
                                    </span>
                              </Col>
                          </Row>
                          <Row xs='12' className='mb-4 lmd-plot-container'>
                              {plot}
                              <hr/>
                          </Row>
                          <Row cs='12' className='mt-3 mb-4 footnote'>
                              <Col>
                                  <small>
                                      The comparisons in the plot and data table were performed across different
                                      segments in the same condition. The plot data should be read and interpreted
                                      following the horizontal guides. The fold change and significance of a segment are
                                      related to the average expression of all segments in the same condition. Due to
                                      the experiment design, it is not possible to draw direct comparisons in the same
                                      segment across conditions.
                                  </small>
                              </Col>
                          </Row>
                          <Row xs='12'>
                              <Col lg='11'>
                                  <h5>{this.props.gene.symbol} expression comparison across regions
                                      in {formatTissueType(this.props.tissueType)}</h5>
                                  <h6>NS = Not Significant</h6>
                              </Col>
                              <Col xs='1' className='text-end'>
                                  {"download link goes here"}
                              </Col>
                          </Row>
                          <Row xs='12'>
                              {table}
                          </Row>
                      </Container>
                  }
              </Container>
            </div>
        )
    }
}

export default RegionalProteomics;
