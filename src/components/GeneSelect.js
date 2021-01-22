import React, { Component } from "react";
import AsyncSelect from "react-select/async";
import { fetchGenes } from "../helpers/ApolloClient"

class GeneSelect extends Component {

    handleSelect = (input) => {
        this.setState({input: input})
    };

    render() {
        return (
            <AsyncSelect
                loadOptions={fetchGenes}
                onChange={(input) => this.handleSelect(input)}
                placeholder="Search for a gene"
                className="select"
            />
        )
    }
}

export default GeneSelect;