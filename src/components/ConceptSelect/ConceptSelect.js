import React, {Component} from "react";
import AsyncSelect from "react-select/async";
import { fetchAutoComplete } from "../../helpers/ApolloClient"

class ConceptSelect extends Component {

    constructor(props) {
        super(props);
        this.selectRef = React.createRef();
        this.state = {
            inputValue: this.props.selectedConcept.value?this.props.selectedConcept.value:""
        }
    }

    handleSelect = (selected) => {
        console.log(selected)
        this.props.setSelectedConcept(selected.value);
    };

    handleInputChange = (input, actionMeta) => {
        console.log(input)
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

        if (inputValue.trim().length >= 3) {
            return "No results found";
        } else if (this.props.placeHolder) {
            return "Please enter 3 or more characters to start search";
        } else {
            return "";
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
        return (
            <span onClick={() => this.setState({inputValue: ""})}>
            <AsyncSelect
                allowClear showSearch
                innerRef={this.selectRef}
                clearValue={() => this.setState({inputValue: ""}) }
                loadOptions={this.getOptions}
                noOptionsMessage={this.handleNoOptions}
                onChange={this.handleSelect}
                inputValue={this.state.inputValue}
                defaultInputValue={this.props.selectedConcept.value}
                onInputChange={this.handleInputChange}
                placeholder="Enter gene, protein, or cell type"
                className="select"
                onClick={() => this.setState({inputValue: ""})}
            />
            </span>
        )
    }
}
ConceptSelect.defaultProps = {
    placeHolder: false
};

export default ConceptSelect;