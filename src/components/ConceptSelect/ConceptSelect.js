import React, { Component } from "react";
import AsyncSelect from "react-select/async";
import { Alert } from 'reactstrap';
import { fetchAutoComplete, fetchDataTypesForConcept, fetchDataTypesForConcept2025 } from "../../helpers/ApolloClient";
import { default as ReactGA4 } from 'react-ga4';

class ConceptSelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: this.props.selectedConcept.value ? this.props.selectedConcept.value : "",
            value: null,
            hasResults: true,
            hasResultsWithDataType: true,
            noResultValue: '',
            alertVisible: false
        };
    }

    handleSelect = (selected) => {
        if (selected !== null) {
            if (selected.value.type === 'gene') {
                if (this.props.featureNewCellClusterData){
                    console.log("Using 2025 query for data types");
                    fetchDataTypesForConcept2025(selected.value.value, "").then(
                    (results) => {
                        let hasResults = results.dataTypesForConcept2025.length > 0;
                        if (hasResults && !this.props.dataType) {
                            this.props.setDataType(results.dataTypesForConcept2025[0], this.props.featureSNData, this.props.featureSCData)
                        }
                        let hasResultsWithDataType = this.props.dataType ? results.dataTypesForConcept2025.includes(this.props.dataType) : true;
                        if (hasResults && hasResultsWithDataType) {
                            this.props.setSelectedConcept(selected.value, this.props.featureNewCellClusterData);
                            this.setState({ value: { label: selected.value.value, value: selected.value }, hasResults, hasResultsWithDataType, noResultValue: '', alertVisible: false });
                        } else {
                            this.setState({ value: { label: selected.value.value, value: selected.value }, hasResults, hasResultsWithDataType, noResultValue: selected.value.value, alertVisible: true });
                        }

                    },
                    (error) => {
                        console.log("There was a problem getting the data: " + error)
                    }
                );
                }
                else{
                    fetchDataTypesForConcept(selected.value.value, "").then(
                        (results) => {
                            let hasResults = results.dataTypesForConcept.length > 0;
                            if (hasResults && !this.props.dataType) {
                                this.props.setDataType(results.dataTypesForConcept[0], this.props.featureSNData, this.props.featureSCData)
                            }
                            let hasResultsWithDataType = this.props.dataType ? results.dataTypesForConcept.includes(this.props.dataType) : true;
                            if (hasResults && hasResultsWithDataType) {
                                this.props.setSelectedConcept(selected.value, this.props.featureNewCellClusterData);
                                this.setState({ value: { label: selected.value.value, value: selected.value }, hasResults, hasResultsWithDataType, noResultValue: '', alertVisible: false });
                            } else {
                                this.setState({ value: { label: selected.value.value, value: selected.value }, hasResults, hasResultsWithDataType, noResultValue: selected.value.value, alertVisible: true });
                            }
    
                        },
                        (error) => {
                            console.log("There was a problem getting the data: " + error)
                        }
                    );
                }
            } else {
                this.props.setSelectedConcept(selected.value, this.featureNewCellClusterData);
                this.setState({ value: { label: selected.value.value, value: selected.value }, hasResults: true, noResultsValue: '', alertVisible: false });
            }
            ReactGA4.event({
                category: 'Explorer',
                action: 'Search',
                label: `${selected.value.type} : ${selected.value.value}`
            });
        }
    };

    handleInputChange = (input, actionMeta) => {
        this.setState({ inputValue: input });
    };

    getLabelIcon = (type) => {
        switch (type) {
            case "cell_type":
                return <img src="/img/search-icon_cell.svg" className="me-2" alt="cell type" />;
            case "gene":
                return <img src="/img/search-icon_gene.svg" className="me-2" alt="gene" />;
            default:
                return <img src="/img/search-icon_gene.svg" className="me-2" alt="gene" />;
        }
    };

    handleNoOptions = ({ inputValue }) => {
        if (inputValue.trim().length < 2) {
            return this.props.moreCharactersMessage;
        } else {
            return "No results found";
        }
    };

    formatOption = (result, searchString) => {
        let highlightedAliases = [];
        let aliasSection = "";
        let aliases = result.aliases;
        if (aliases) {
            highlightedAliases = result.aliases.map((item, index) =>
                item.toLowerCase().includes(searchString.toLowerCase()) ? <strong>{index > 0 && ', '}{item}</strong> : <span>{index > 0 && ', '}{item}</span>
                , this);
        }
        const labelIcon = this.getLabelIcon(result.type);
        const highlightedValue = result.value.toLowerCase().includes(searchString.toLowerCase()) ? <strong>{result.value}</strong> : <span>{result.value}</span>;
        if ((result.aliases !== null) && (result.aliases.length !== 0)) {
            aliasSection = <span>({highlightedAliases})</span>
        }
        return {
            label: <div>{labelIcon}
                {highlightedValue} {aliasSection}</div>,
            value: result
        }
    };

    getOptions = async (searchString) => {
        const results = await fetchAutoComplete(searchString);
        const filteredResults = this.filterBySearchType(results);
        return filteredResults.map((result) => this.formatOption(result, searchString), this);
    };

    filterBySearchType = (results) => {
        if (!this.props.searchType || this.props.searchType === 'all') {
            return results
        } else {
            return results.filter((result) => this.props.searchType === result.type)
        }
    };

    onDismiss = () => {
        this.setState({ alertVisible: false });
    }

    render() {
        let customStyles = {
            singleValue: (provided, state) => ({
                display: state.selectProps.menuIsOpen ? 'none' : 'block',
            })
        };

        if (this.props.smallFormat) {
            customStyles["menu"] = styles => ({
                ...styles,
                width: '460px',
                zIndex: '100'
            })
        }

        let noResultsAlert = '';
        if (this.state.hasResults && !this.state.hasResultsWithDataType) {
            noResultsAlert = <div className={`${this.props.overflowWarningContainer ? 'full-width' : ''} mt-3`}><Alert color="warning" isOpen={this.state.alertVisible} toggle={this.onDismiss}>
                The gene, {this.state.noResultValue}, is not detected in this dataset.
            </Alert></div>;
        }
        if (!this.state.hasResults) {
            noResultsAlert = <div className={`${this.props.overflowWarningContainer ? 'full-width' : ''} mt-3`}><Alert  color="warning" isOpen={this.state.alertVisible} toggle={this.onDismiss}>
                The gene, {this.state.noResultValue}, is not detected in any dataset.
            </Alert></div>;
        }

        return (
            <article>
                <AsyncSelect
                    allowClear
                    loadOptions={this.getOptions}
                    styles={customStyles}
                    noOptionsMessage={this.handleNoOptions}
                    onChange={this.handleSelect}
                    value={this.state.value}
                    inputValue={this.state.inputValue}
                    defaultInputValue={this.props.selectedConcept.value}
                    onInputChange={this.handleInputChange}
                    placeholder={this.props.placeHolderText}
                    onFocus={() => this.setState({ inputValue: "" })}
                    onBlur={() => this.setState({ inputValue: this.props.selectedConcept.value, value: [{ label: this.props.selectedConcept.value, value: this.props.selectedConcept }] })}
                    className="select"
                />
                {noResultsAlert}
            </article>
        )
    }
}
ConceptSelect.defaultProps = {
    moreCharactersMessage: "Please enter 2 or more characters to start search",
    placeHolderText: "Enter a gene or cell type",
    smallFormat: false,
    searchType: 'all',
    overflowWarningContainer: false
};

export default ConceptSelect;
