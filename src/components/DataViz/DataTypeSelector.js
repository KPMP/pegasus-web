import React, { Component } from "react";
import Select from "react-select";
import { Row, Col, Container } from 'reactstrap';
import ConceptSelectContainer from '../ConceptSelect/ConceptSelectContainer';
import { getTissueTypeOptions, getAllDataTypeOptions, getDataTypeOptionsWithTissueType } from "../../helpers/Utils";
import { fetchGeneDatasetSummary } from '../../helpers/ApolloClient';
import { handleGoogleAnalyticsEvent } from '../../helpers/googleAnalyticsHelper';
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class DataTypeSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tissueInputValue: this.props.tissueType ? this.props.tissueType : "all",
            isDatasetSummaryLoading: false,
            tissueValue: null,
            dataTypeInputValue: null,
            dataTypeOptions: [],
            availableData: [],
            selectedDataset: {
                hrtCount: '-',
                akiCount: '-',
                ckdCount: '-',
                participantsCount: '-',
            },
            datasetToggle: 'collapsed'
        }
    }


    componentDidUpdate(prevProps) {
        if ((this.props.gene.symbol !== prevProps.gene.symbol
            || this.props.dataType !== prevProps.dataType
            || this.props.tissueType !== prevProps.tissueType)) {
            if (this.props.gene.symbol) {
                this.reloadPageData(this.props.gene.symbol);
            } else {
                this.fetchGeneDatasetSummary();
            }
        }
    }

    componentDidMount() {
        let options = getAllDataTypeOptions()
        let tissueTypeOptions = getTissueTypeOptions(this.state.selectedDataset, this.props.gene.symbol);

        let selectedOption = options.find(item => this.props.dataType === item.value);
        let selectedTissueType = tissueTypeOptions.find(item => this.state.tissueInputValue === item.value)
        this.setState({ dataTypeOptions: options, dataTypeInputValue: selectedOption, tissueValue: selectedTissueType })

        if (this.props.gene.symbol) {
            this.reloadPageData(this.props.gene.symbol);
        } else {
            this.fetchGeneDatasetSummary();
        }
    }

    setSelectedDatasetSummary(dataTypeShort, availableData) {
        // Coming from homepage search (no datatype yet)
        if (!dataTypeShort && availableData && availableData.length > 0) {
            this.props.setDataType(availableData[0].dataTypeShort);
            this.props.setTissueType(this.props.tissueType ? this.props.tissueType : "all");
            this.setState({ selectedDataset: availableData[0], tissueInputValue: "all"})
            return
        }
        // Coming from search on viz page (has datatype)
        for (const [, dataset] of availableData.entries()) {
            if (dataset["dataTypeShort"] === dataTypeShort) {
                this.props.setTissueType(this.props.tissueType ? this.props.tissueType : "all");
                this.setState({ selectedDataset: dataset, })
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
        this.setState({ isDatasetSummaryLoading: true, datasetToggle: 'collapsed' });
        return fetchGeneDatasetSummary(geneSymbol).then(
            (datasetSummary) => {
                if (datasetSummary) {
                    datasetSummary = this.formatGeneDataset(datasetSummary)
                    this.setSelectedDatasetSummary(this.props.dataType, datasetSummary)
                    this.setState({ isDatasetSummaryLoading: false });
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
                this.setState({ selectedDataset, isDatasetSummaryLoading: false });
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
                            let tissueTypeOptions = getTissueTypeOptions(this.state.selectedDataset, this.props.gene.symbol);

                            let selectedTissueType = tissueTypeOptions.find(item => this.state.tissueInputValue === item.value)
                            this.setState({ dataTypeOptions: options, dataTypeInputValue: selectedOption, availableData: datasetSummary, tissueValue: selectedTissueType })
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
        let options = getTissueTypeOptions(this.state.selectedDataset, this.props.gene.symbol);
        try {
            return options.find(element => element.value === this.state.tissueInputValue).label
        } catch (e) {
            return ''
        }
    };

    getRepositoryLink = () => {
        const linkMapping = {
            'sn': '/repository/?facetTab=files&files_size=60&files_sort=%5B%7B%22field%22%3A%22file_name%22%2C%22order%22%3A%22asc%22%7D%5D&filters=%7B%22op%22%3A%22and%22%2C%22content%22%3A%5B%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22dois%22%2C%22value%22%3A%5B%2210.48698%2Fyyvc-ak78%22%5D%7D%7D%5D%7D',
            'sc': '/repository/?facetTab=files&files_size=60&files_sort=%5B%7B%22field%22%3A%22file_name%22%2C%22order%22%3A%22asc%22%7D%5D&filters=%7B%22op%22%3A%22and%22%2C%22content%22%3A%5B%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22dois%22%2C%22value%22%3A%5B%2210.48698%2F92nk-e805%22%5D%7D%7D%5D%7D',
            'rt': '/repository/?facetTab=files&files_size=60&files_sort=%5B%7B%22field%22%3A%22file_name%22%2C%22order%22%3A%22asc%22%7D%5D&filters=%7B%22op%22%3A%22and%22%2C%22content%22%3A%5B%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22dois%22%2C%22value%22%3A%5B%2210.48698%2Ft9fh-qn48%22%5D%7D%7D%5D%7D',
            'default': '/repository',
        }
        if (linkMapping[this.props.dataType]) {
            return linkMapping[this.props.dataType]
        } else {
            return linkMapping['default']
        }
    }
    getDataTypeInfo = (dataType) => {
        let copy = {
            'sn': 'This single-nucleus dataset is comprised of healthy reference tissue from 3 tumor nephrectomies procured in a KPMP pilot project, 18 living donor tissue healthy reference tissue samples from 10 donors procured as part of the Human Biomolecular Atlas Program (HuBMAP), and 10 CKD and 6 AKI biopsy participants from the KPMP main study protocol.',
            'sc': 'This single-cell dataset is comprised of 20 samples from 18 living donor biopsy participants from the Human Cell Atlas, as well as 15 CKD and 12 AKI biopsy participants from the KPMP main study protocol.',
            'rt': 'This regional transcriptomics dataset is comprised of healthy reference tissue from 6 tumor nephrectomies procured in a KPMP pilot project, 3 deceased donor nephrectomy healthy reference tissue samples, 5 AKI biopsy participants from the KPMP main study protocol, 8 CKD biopsy participants from the KPMP main study protocol, and 14 CKD samples from the Diabetic Complications Consortium (DiaComp).'
        }
        if(dataType && copy[dataType.value]){
            return copy[dataType.value]
        }
        return null
    }
    toggleDataset = () => {
        this.setState({
            datasetToggle: (this.state.datasetToggle === 'collapsed' ? 'open' : 'collapsed')
        })
    }
    render() {
        let selectedValue = this.state.dataTypeInputValue ? this.state.dataTypeInputValue : null;
        let dataInfo = this.getDataTypeInfo(selectedValue)
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
                                options={getTissueTypeOptions(this.state.selectedDataset, this.props.gene.symbol)}
                                onChange={this.handleTissueSelect}
                                value={this.state.tissueValue}
                                inputValue={this.getInputValue()}
                                onFocus={() => this.setState({ tissueInputValue: '' })}
                                className='select d-table-cell w-100 pl-2'
                                isDisabled={this.state.isDatasetSummaryLoading ? true : false}
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
                                isDisabled={this.state.isDatasetSummaryLoading ? true : false}
                            />
                        </Col>
                    </Row>
                    <Row xs="12" className='mt-1 pl-0' >
                        <Col lg="12" className='d-table pl-2'>
                            <span className='d-table-cell pt-1 dataset-info'>Dataset coverage: N={this.state.selectedDataset.participantCount} PARTICIPANTS; {this.state.selectedDataset.hrtCount} HEALTHY REFERENCE (HRT); {this.state.selectedDataset.ckdCount} CKD; {this.state.selectedDataset.akiCount} AKI <a target="_blank" rel="noreferrer" href={this.getRepositoryLink()}><svg xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                width="25" height="25" viewBox="0 0 200 200"><defs><clipPath id="b"><rect width="200" height="200" /></clipPath></defs><g id="a" clip-path="url(#b)"><g transform="translate(0 4)"><g transform="translate(0 0)"><path d="M650.18,395.671a38.6,38.6,0,0,1-38.6,38.6,4.089,4.089,0,1,1,0-8.177,30.417,30.417,0,0,0,6.161-60.2,4.061,4.061,0,0,1-3.256-4.126l.028-.606c.009-.142.019-.237.019-.341a32.245,32.245,0,0,0-32.16-32.15h-.492l-1.041.057-.663.057a4.1,4.1,0,0,1-3.786-1.912,42.406,42.406,0,0,0-77.787,30.087,4.159,4.159,0,0,1-.861,3.36,4.1,4.1,0,0,1-3.161,1.476h-4.079a32.146,32.146,0,0,0,.009,64.291,4.093,4.093,0,0,1-.009,8.187,40.33,40.33,0,0,1-.625-80.655c-.142-1.5-.208-3-.208-4.486A50.6,50.6,0,0,1,582.008,320.5h.369a40.168,40.168,0,0,1,40.28,38.207A38.669,38.669,0,0,1,650.18,395.671Z" transform="translate(-450.18 -298.52)" /><path d="M557.476,325.485a3.621,3.621,0,0,1-3.615,3.615,27.812,27.812,0,0,0-27.74,27.721,3.615,3.615,0,1,1-7.231,0,35.074,35.074,0,0,1,34.971-34.961A3.623,3.623,0,0,1,557.476,325.485Z" transform="translate(-453.861 -299.771)" /></g><g transform="translate(54.079 78.468)"><path d="M594.922,393.412a31.32,31.32,0,0,0-10.127-6.417c-8.452-3.587-19.648-5.565-31.526-5.565s-23.083,1.978-31.526,5.556a31.548,31.548,0,0,0-10.136,6.426,13.414,13.414,0,0,0-4.287,9.285v70.168c0,3.218,1.476,6.407,4.287,9.228a31.287,31.287,0,0,0,10.127,6.426c8.518,3.615,19.714,5.6,31.535,5.6s23.008-1.987,31.516-5.593a31.464,31.464,0,0,0,10.155-6.445c2.792-2.811,4.278-6,4.278-9.218V402.677A13.417,13.417,0,0,0,594.922,393.412Zm-1.855,79.444a7.033,7.033,0,0,1-2.442,4.893,26.168,26.168,0,0,1-8.224,5.111c-7.676,3.246-18.295,5.12-29.131,5.12s-21.465-1.874-29.15-5.13a26.092,26.092,0,0,1-8.2-5.092,7.023,7.023,0,0,1-2.461-4.9V460.362a33.361,33.361,0,0,0,8.272,4.77c8.518,3.615,19.714,5.6,31.535,5.6s23.008-1.988,31.516-5.6a33.511,33.511,0,0,0,8.281-4.761Zm0-23.386a7.05,7.05,0,0,1-2.442,4.893,26.167,26.167,0,0,1-8.224,5.111c-7.676,3.246-18.295,5.111-29.131,5.111s-21.465-1.864-29.15-5.12a26.091,26.091,0,0,1-8.2-5.092,7.023,7.023,0,0,1-2.461-4.9V436.976a33.659,33.659,0,0,0,8.272,4.77c8.518,3.606,19.714,5.593,31.535,5.593s23.008-1.988,31.516-5.593a33.544,33.544,0,0,0,8.281-4.77Zm0-23.386a7.014,7.014,0,0,1-2.442,4.884,26,26,0,0,1-8.224,5.111c-7.676,3.256-18.295,5.12-29.131,5.12-10.856,0-21.475-1.864-29.15-5.12a26.265,26.265,0,0,1-8.2-5.092,7.023,7.023,0,0,1-2.461-4.9V413.59a33.659,33.659,0,0,0,8.272,4.77c8.518,3.606,19.714,5.593,31.535,5.593s23.008-1.987,31.516-5.593a33.544,33.544,0,0,0,8.281-4.77Zm-2.442-18.5a25.934,25.934,0,0,1-8.234,5.111c-7.666,3.256-18.285,5.12-29.122,5.12s-21.465-1.865-29.15-5.12a26.263,26.263,0,0,1-8.2-5.092c-1.656-1.666-2.461-3.265-2.461-4.9a7.057,7.057,0,0,1,2.442-4.931,26.145,26.145,0,0,1,8.234-5.111c7.609-3.227,18.228-5.082,29.131-5.082s21.512,1.855,29.141,5.082a26.049,26.049,0,0,1,8.2,5.092,6.157,6.157,0,0,1,.019,9.833Z" transform="translate(-507.32 -381.43)" /><path d="M593.414,464.839v12.483a7.033,7.033,0,0,1-2.442,4.893,26.167,26.167,0,0,1-8.224,5.111c-7.676,3.246-18.295,5.12-29.131,5.12s-21.465-1.874-29.15-5.13a26.091,26.091,0,0,1-8.2-5.092,7.023,7.023,0,0,1-2.461-4.9V464.83a33.361,33.361,0,0,0,8.272,4.77c8.518,3.615,19.714,5.6,31.535,5.6s23.008-1.988,31.516-5.6A33.511,33.511,0,0,0,593.414,464.839Z" transform="translate(-507.668 -385.898)" fill="#fff" /><path d="M593.414,440.12v12.493a7.05,7.05,0,0,1-2.442,4.893,26.167,26.167,0,0,1-8.224,5.111c-7.676,3.246-18.295,5.111-29.131,5.111s-21.465-1.864-29.15-5.12a26.091,26.091,0,0,1-8.2-5.092,7.023,7.023,0,0,1-2.461-4.9V440.12a33.659,33.659,0,0,0,8.272,4.77c8.518,3.606,19.714,5.593,31.535,5.593s23.008-1.988,31.516-5.593A33.544,33.544,0,0,0,593.414,440.12Z" transform="translate(-507.668 -384.574)" fill="#fff" /><path d="M593.414,415.41V427.9a7.014,7.014,0,0,1-2.442,4.884,26,26,0,0,1-8.224,5.111c-7.676,3.256-18.295,5.12-29.131,5.12-10.856,0-21.475-1.864-29.15-5.12a26.264,26.264,0,0,1-8.2-5.092,7.023,7.023,0,0,1-2.461-4.9V415.41a33.66,33.66,0,0,0,8.272,4.77c8.518,3.606,19.714,5.593,31.535,5.593s23.008-1.987,31.516-5.593A33.545,33.545,0,0,0,593.414,415.41Z" transform="translate(-507.668 -383.25)" fill="#fff" /><path d="M593.414,403.044a7.031,7.031,0,0,1-2.442,4.884,25.933,25.933,0,0,1-8.234,5.111c-7.666,3.256-18.285,5.12-29.122,5.12s-21.465-1.865-29.15-5.12a26.262,26.262,0,0,1-8.2-5.092c-1.656-1.666-2.461-3.265-2.461-4.9a7.057,7.057,0,0,1,2.442-4.931A26.144,26.144,0,0,1,524.486,393c7.609-3.227,18.228-5.082,29.131-5.082s21.512,1.855,29.141,5.082a26.049,26.049,0,0,1,8.2,5.092A7.082,7.082,0,0,1,593.414,403.044Z" transform="translate(-507.668 -381.778)" fill="#fff" /></g></g></g></svg>
                            </a>
                            </span>
                        </Col>
                    </Row>
                    <div className="dataset-details">
                    <Row xs="12" className='mt-1 pl-0' >
                    
                        <Col lg="12" className='d-table pl-2'>
                            {dataInfo && 
                            <div>
                                {this.state.datasetToggle === 'collapsed'
                                    ? <span className="a-button" onClick={this.toggleDataset}>Show dataset details <FontAwesomeIcon icon={faChevronDown} /></span>
                                    : <span className="a-button" onClick={this.toggleDataset}>Hide dataset details <FontAwesomeIcon icon={faChevronUp} /></span>
                                }    
                                {(this.props.dataType === 'sc' ) &&
                                    <span> | <a rel='noreferrer'target='_blank' href='https://cellxgene.cziscience.com/e/32b9bdce-2481-4c85-ba1b-6ad5fcea844c.cxg/'>View additional information in cellxgene</a> </span>
                                }
                                {
                                    (this.props.dataType === 'sn') &&
                                    <span> | <a rel='noreferrer' target='_blank' href='https://cellxgene.cziscience.com/e/07854d9c-5375-4a9b-ac34-fa919d3c3686.cxg/'>View additional information in cellxgene</a> </span>
                                }
                            </div>
                            }
                        </Col>
                    </Row>
                    <Row xs="12" className='mt-1 pl-0' >
                        <Col lg="12" className='d-table pl-2'>
                            {this.state.datasetToggle === 'collapsed'
                                ? ''
                                : <p>{dataInfo}</p>
                            }
                        </Col>
                    </Row>
                    </div>
                </Container>
            </Container>
        )
    }
}

export default DataTypeSelector;
