import React, { Component } from "react";
import Select from "react-select";
import { Row, Col, Container } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import ConceptSelectContainer from '../ConceptSelect/ConceptSelectContainer';
import { getTissueTypeOptions, getDataTypeOptions } from "../../helpers/Utils";
import { fetchGeneDatasetSummary } from '../../helpers/ApolloClient';

class DataTypeSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tissueInputValue: getTissueTypeOptions({}, this.props.tissueType),
            tissueValue: null,
            dataTypeInputValue: null,
            dataTypeOptions: [],
            availableData: [],
            selectedDataset: {
                hrtCount: '-',
                akiCount: '-',
                ckdCount: '-',
                participantsCount: '-',
            }
        }
    }


    componentDidUpdate(prevProps) {
        if (this.props.gene.symbol !== prevProps.gene.symbol || this.props.dataType !== prevProps.dataType) {
            this.fetchGeneDatasetSummary(this.props.gene.symbol);
        }
    }

    componentDidMount() {
        this.fetchGeneDatasetSummary(this.props.gene.symbol)

        getDataTypeOptions(this.props.gene.symbol, "").then(
            (options) => {
                let selectedOption = options.find(item => this.props.dataType === item.value);
                this.setState({ dataTypeOptions: options, dataTypeInputValue: selectedOption })
            },
            (error) => {
                this.setState({ dataTypeOptions: [] });
                console.log("There was a problem getting the data: " + error)
            }
        );
    }

    setSelectedDatasetSummary(dataTypeShort, availableData) {
        for (const [dataType, dataset] of availableData.entries()) {
            if (dataset["dataTypeShort"] == dataTypeShort) {
                this.setState({ selectedDataset: dataset })
            }

        }
    }

    formatGeneDataset(datasetSummary) {
        for (const [dataType, dataset] of datasetSummary.entries()) {
            for (const property in dataset) {
                if (datasetSummary[dataType][property] === '0') {
                    datasetSummary[dataType][property] = '-';
                }
            }
        }
        return datasetSummary
    }

    fetchGeneDatasetSummary = async (geneSymbol) => {
        fetchGeneDatasetSummary(geneSymbol).then(
            (datasetSummary) => {
                if (datasetSummary) {
                    datasetSummary = this.formatGeneDataset(datasetSummary)
                    this.setSelectedDatasetSummary(this.props.dataType, datasetSummary)

                    this.setState({
                        availableData: datasetSummary
                    });
                    return datasetSummary
                }
            },
            (error) => {
                let selectedDataset = {
                    participantCount: '-',
                    hrtCount: '-',
                    akiCount: '-',
                    ckdCount: '-'
                }
                this.setState({ selectedDataset });
                console.log('There was a problem fetching the gene summary data: ' + error)
            }
        );
    }

    handleTissueSelect = (selected, actionMeta) => {
        this.props.setTissueType(selected.value);
        this.setState({ tissueValue: selected });
    };

    handleInputChange(inputValue, action) {
        if (action.action !== "input-blur" && action.action !== "menu-close") {
            this.props.setDataType(inputValue.value);
            this.setState({ dataTypeInputValue: inputValue });
        }
    };

    render() {
        let selectedValue = this.state.dataTypeInputValue;
        return (
            <Container className='pb-3 pt-2 px-0 sticky-top' id='dt-select-container'>
                <Container className='rounded border shadow-sm pb-4 px-4'>
                    <Row xs="12">
                        <Col lg="2" id='concept-selector' className='px-2 pt-3'>
                            <ConceptSelectContainer searchType="gene" dataType={this.props.dataType} selectedConcept={{ value: this.props.gene.symbol, name: "" }} placeHolderText={""} smallFormat={true} />
                        </Col>
                        <Col lg="3" className='d-table px-2 pt-3'>
                            <span className='d-table-cell text-bigger pr-2'>in:</span>
                            <Select
                                allowClear
                                options={getTissueTypeOptions(this.state.selectedDataset)}
                                onChange={this.handleTissueSelect}
                                value={this.state.tissueValue}
                                inputValue={this.state.tissueInputValue}
                                defaultInputValue={getTissueTypeOptions(this.state.selectedDataset, this.props.tissueType)}
                                onFocus={() => this.setState({ tissueInputValue: "" })}
                                className='select d-table-cell w-100 pl-2'
                            />
                        </Col>
                        <Col lg="3" className='d-table px-2 pt-3'>
                            <label className='d-table-cell text-bigger pr-2'>in:</label>
                            <Select
                                value={selectedValue}
                                options={this.state.dataTypeOptions}
                                onChange={this.handleInputChange.bind(this)}
                                className='select d-table-cell w-100 pl-2'
                                styles={{ menu: provided => ({ ...provided, zIndex: 999 }) }}

                            />
                        </Col>
                        <Col lg='4' className='text-right pt-3'>
                            <a className="icon-container" href='https://www.kpmp.org/help-docs/data' target='_blank' rel="noreferrer"><FontAwesomeIcon icon={faQuestionCircle} className='ml-2 kpmp-light-blue' /></a>
                        </Col>
                    </Row>
                    <Row xs="12" className='mt-1 pl-0' >
                        <Col lg="12" className='d-table pl-2'>
                            <span className='d-table-cell pt-1 dataset-info'>Dataset coverage: N={this.state.selectedDataset.participantCount} PARTICIPANTS; {this.state.selectedDataset.hrtCount} HEALTHY REFERENCE; {this.state.selectedDataset.ckdCount} CKD; {this.state.selectedDataset.akiCount} AKI</span>
                        </Col>
                    </Row>
                </Container>
            </Container>
        )
    }
}

export default DataTypeSelector;
