import React, { Component } from "react";
import AsyncSelect from "react-select/async";
import { fetchAutoComplete } from "../../helpers/ApolloClient"

class ConceptSelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: this.props.selectedConcept.value ? this.props.selectedConcept.value : "",
            value: null,
        };
    }

    handleSelect = (selected) => {
        if (selected !== null) {
            this.props.setSelectedConcept(selected.value);
            this.setState({value: [{label: selected.value.value, value: selected.value}]});
        }
    };

    handleInputChange = (input, actionMeta) => {
        this.setState({inputValue: input});
    };

    getLabelIcon = (type) => {
        switch(type) {
            case "cell_type":
                return <img src="/explorer/img/search-icon_cell.svg" className="mr-2" alt="cell type"/>;
            case "gene":
                return <img src="/explorer/img/search-icon_gene.svg" className="mr-2" alt="gene"/>;
            default:
                return <img src="/explorer/img/search-icon_gene.svg" className="mr-2" alt="gene"/>;
        }
    };

    handleNoOptions = ({inputValue}) => {
        if (inputValue.trim().length < 3) {
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
                    item.toLowerCase().includes(searchString.toLowerCase())?<strong>{index > 0 && ', '}{item}</strong>:<span>{index > 0 && ', '}{item}</span>
                , this);
        }
        const labelIcon = this.getLabelIcon(result.type);
        const highlightedValue = result.value.toLowerCase().includes(searchString.toLowerCase())?<strong>{result.value}</strong>:<span>{result.value}</span>;
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

    render() {
        let customStyles = {
            singleValue: (provided, state) => ({
                display: state.selectProps.menuIsOpen ? 'none' : 'block',
            })
        };

        if (this.props.smallFormat) {
            customStyles["menu"] = styles => ({ ...styles,
                width: '460px'
            })
        }

        return (
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
                onFocus={() => this.setState({inputValue: ""})}
                onBlur={() => this.setState({inputValue: this.props.selectedConcept.value, value: [{label: this.props.selectedConcept.value, value: this.props.selectedConcept}]})}
                className="select"
            />
        )
    }
}
ConceptSelect.defaultProps = {
    moreCharactersMessage: "Please enter 3 or more characters to start search",
    placeHolderText: "Enter gene, protein, or cell type",
    smallFormat: false,
    searchType: 'all'
};

export default ConceptSelect;