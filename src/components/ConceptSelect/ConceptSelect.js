import React, { Component } from "react";
import AsyncSelect from "react-select/async";
import { fetchAutoComplete } from "../../helpers/ApolloClient"

class ConceptSelect extends Component {

    constructor(props) {
        super(props);
        this.selectRef = React.createRef();
        this.state = {
            inputValue: this.props.selectedConcept.value ? this.props.selectedConcept.value : "",
            value: null,
        }
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
        let aliases = result.aliases;
        if (aliases) {
            highlightedAliases = result.aliases.map((item, index) =>
                    item.toLowerCase().includes(searchString.toLowerCase())?<strong>{index > 0 && ', '}{item}</strong>:<span>{index > 0 && ', '}{item}</span>
                , this);
        }
        const labelIcon = this.getLabelIcon(result.type);
        const highlightedValue = result.value.toLowerCase().includes(searchString.toLowerCase())?<strong>{result.value}</strong>:<span>{result.value}</span>;
        return {
            label: <div>{labelIcon}
                {highlightedValue} {result.aliases && <span>({highlightedAliases})</span>}</div>,
            value: result
        }
    };

    getOptions = async (searchString) => {
        const results = await fetchAutoComplete(searchString);
        return results.map((result) => this.formatOption(result, searchString), this);
    };

    render() {
        const customStyles = {
            singleValue: (provided, state) => ({
                display: state.selectProps.menuIsOpen ? 'none' : 'block',
            })
        };
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
                className="select"
            />
        )
    }
}
ConceptSelect.defaultProps = {
    moreCharactersMessage: "Please enter 3 or more characters to start search",
    placeHolderText: "Enter gene, protein, or cell type"
};

export default ConceptSelect;