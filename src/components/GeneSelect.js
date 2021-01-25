import React, {Component} from "react";
import AsyncSelect from "react-select/async";
import {fetchGenes} from "../helpers/ApolloClient"
import {faDna} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class GeneSelect extends Component {

    handleSelect = (input) => {
        this.setState({input: input})
    };

    getOptions = async (searchString) => {
        const results = await fetchGenes(searchString);
        return results.map(
            ({symbol, id, alias}) => ({
                label: <span><FontAwesomeIcon icon={faDna} className="mr-2"/>{symbol} {alias && "(" + alias.join(", ") + ")"}</span>,
                value: id
            })
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