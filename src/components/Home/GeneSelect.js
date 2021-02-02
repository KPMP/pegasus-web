import React, {Component} from "react";
import AsyncSelect from "react-select/async";
import { fetchAutoComplete } from "../helpers/ApolloClient"
import {faDna, faMicroscope} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class GeneSelect extends Component {

    handleSelect = (input) => {
        this.setState({input: input})
    };

    getLabelIcon = (type) => {
        switch(type) {
            case "cell_type":
                return <FontAwesomeIcon icon={faMicroscope} className="mr-2"/>
            case "gene":
                return <FontAwesomeIcon icon={faDna} className="mr-2"/>
            default:
                return <FontAwesomeIcon icon={faDna} className="mr-2"/>
        }
    };

    getOptions = async (searchString) => {
        const results = await fetchAutoComplete(searchString);
        return results.map(
            ({value, id, aliases, type}) => {
                let highlightedAliases = [];
                if (aliases) {
                    highlightedAliases = aliases.map((item, index) =>
                        item.toLowerCase().includes(searchString.toLowerCase())?<strong>{index > 0 && ', '}{item}</strong>:<span>{index > 0 && ', '}{item}</span>
                    , this);
                }
                const labelIcon = this.getLabelIcon(type);
                return {
                    label: <div>{labelIcon}
                        {value} {aliases && <span>({highlightedAliases})</span>}</div>,
                    value: id
                }
            }, this
        );
    };

    render() {
        return (
            <AsyncSelect
                loadOptions={this.getOptions}
                onChange={(input) => this.handleSelect(input)}
                placeholder="Search for a gene"
                className="select"
            />
        )
    }
}

export default GeneSelect;
