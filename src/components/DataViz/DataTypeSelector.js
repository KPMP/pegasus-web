import React, { Component } from "react";
import Select from "react-select";
import { Row, Col, Container } from 'reactstrap';
import ConceptSelectContainer from '../ConceptSelect/ConceptSelectContainer';
import { getTissueTypeOptions, getAllDataTypeOptions, getDataTypeOptionsWithTissueType } from "../../helpers/Utils";
import { fetchGeneDatasetSummary } from '../../helpers/ApolloClient';
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';

class DataTypeSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tissueInputValue: this.props.tissueType ? this.props.tissueType : "",
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
        if ((this.props.gene.symbol !== prevProps.gene.symbol || this.props.dataType !== prevProps.dataType || this.props.tissueType !== prevProps.tissueType)) {
            if (this.props.gene.symbol) {
                this.reloadPageData(this.props.gene.symbol);
            } else {
                this.fetchGeneDatasetSummary();

            }
        }
    }

    componentDidMount() {
        let options = getAllDataTypeOptions()
        console.log('options', options)
        let selectedOption = options.find(item => this.props.dataType === item.value);
        this.setState({ dataTypeOptions: options, dataTypeInputValue: selectedOption })

        if (this.props.gene.symbol) {
            this.reloadPageData(this.props.gene.symbol);
        } else {
            this.fetchGeneDatasetSummary();
        }
    }

    setSelectedDatasetSummary(dataTypeShort, availableData) {
        if (!dataTypeShort && availableData && availableData.length > 0) {
            this.props.setDataType(availableData[0].dataTypeShort);
            this.setState({ selectedDataset: availableData[0], tissueInputValue: "all" })
            return
        }

        for (const [dataType, dataset] of availableData.entries()) {
            if (dataset["dataTypeShort"] === dataTypeShort) {
                this.setState({ selectedDataset: dataset })
                return
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
                    console.log('data', this.props.dataType, datasetSummary)
                    this.setState({ selectedDataset: datasetSummary, tissueInputValue: "all" })

                    this.setSelectedDatasetSummary(this.props.dataType, datasetSummary)
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
                console.log('There was a problem fetching the gene summary data: ' + error)
                this.setState({ selectedDataset });
            }
        );
    }


    reloadPageData = async (geneSymbol) => {
        this.fetchGeneDatasetSummary(geneSymbol).then(
            (datasetSummary) => {
                if (datasetSummary) {
                    datasetSummary = this.formatGeneDataset(datasetSummary)
                    this.setSelectedDatasetSummary(this.props.dataType, datasetSummary)
                    getDataTypeOptionsWithTissueType(this.props.gene.symbol, "", datasetSummary, this.props.tissueType).then(
                        (options) => {
                            let selectedOption = options.find(item => this.props.dataType === item.value);
                            this.setState({ dataTypeOptions: options, dataTypeInputValue: selectedOption, availableData: datasetSummary })
                        },
                        (error) => {
                            this.setState({ dataTypeOptions: [] });
                            console.log("There was a problem getting the data: " + error)
                        }
                    );
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
                console.log('There was a problem fetching the gene summary data: ' + error)
                this.setState({ selectedDataset });
            }
        );
    }



    handleTissueSelect = (selected, actionMeta) => {
        handleGoogleAnalyticsEvent('Subset', 'Tissue', selected.value);
        this.props.setTissueType(selected.value);
        this.setState({ tissueValue: selected });
    };

    handleInputChange(inputValue, action) {
        if (action.action !== "input-blur" && action.action !== "menu-close") {
            handleGoogleAnalyticsEvent('Navigation', 'via data type', inputValue.value);
            this.props.setDataType(inputValue.value);
            this.setState({ dataTypeInputValue: inputValue });
        }
    };

    getInputValue = () => {
        let options = getTissueTypeOptions(this.state.selectedDataset);
        try {
            return options.find(element => element.value === this.state.tissueInputValue).label
        } catch (e) {
            return ''
        }
    };

    render() {
        let selectedValue = this.state.dataTypeInputValue ? this.state.dataTypeInputValue : null;
        return (
            <Container className='pb-3 pt-2 px-0 sticky-top' id='dt-select-container'>
                <Container className='rounded border shadow-sm pb-4 px-4'>
                    <Row xs="12">
                        <Col lg="2" id='concept-selector' className='px-2 pt-3'>
                            <ConceptSelectContainer searchType="gene"
                                dataType={this.props.dataType}
                                selectedConcept={{ value: this.props.gene.symbol, name: "" }}
                                placeHolderText={"Enter a gene"}
                                smallFormat={true} />
                        </Col>
                        <Col lg="3" className='d-table px-2 pt-3'>
                            <span className='d-table-cell text-bigger pr-2'>in:</span>
                            <Select
                                allowClear
                                options={getTissueTypeOptions(this.state.selectedDataset)}
                                onChange={this.handleTissueSelect}
                                value={this.state.tissueValue}
                                inputValue={this.getInputValue()}
                                onFocus={() => this.setState({ tissueInputValue: "" })}
                                className='select d-table-cell w-100 pl-2'
                                isDisabled={this.props.isLoadingUmap ? true : false}
                            />
                        </Col>
                        <Col lg="4" className='d-table px-2 pt-3'>
                            <label className='d-table-cell text-bigger pr-2'>in:</label>
                            <Select
                                value={selectedValue}
                                options={this.state.dataTypeOptions}
                                onChange={this.handleInputChange.bind(this)}
                                className='select d-table-cell w-100 pl-2'
                                styles={{ menu: provided => ({ ...provided, zIndex: 999 }) }}
                                isDisabled={this.props.isLoadingUmap ? true : false}
                            />
                        </Col>
                    </Row>
                    <Row xs="12" className='mt-1 pl-0' >
                        <Col lg="12" className='d-table pl-2'>
                            <span className='d-table-cell pt-1 dataset-info'>Dataset coverage: N={this.state.selectedDataset.participantCount} PARTICIPANTS; {this.state.selectedDataset.hrtCount} HEALTHY REFERENCE (HRT); {this.state.selectedDataset.ckdCount} CKD; {this.state.selectedDataset.akiCount} AKI</span>
                        </Col>
                    </Row>
                </Container>
            </Container>
        )
    }
}

export default DataTypeSelector;
