import React, {Component} from "react";
import AsyncSelect from "react-select/async";
import {fetchGenes} from '../../helpers/ApolloClient';
import {faDna} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class GeneSelect extends Component {

    handleSelect = (input) => {
        this.setState({input: input})
    };

    getOptions = async (searchString) => {
        const results = await fetchGenes(searchString);
        return results.map(
            ({symbol, id, alias}) => {
                let highlightedAliases = [];
                if (alias) {
                    highlightedAliases = alias.map((item, index) =>
                        item.toLowerCase().includes(searchString.toLowerCase())?<strong>{index > 0 && ', '}{item}</strong>:<span>{index > 0 && ', '}{item}</span>
                    , this);
                }
                return {
                    label: <div><FontAwesomeIcon icon={faDna} className="mr-2"/>
                        {symbol} {alias && <span>({highlightedAliases})</span>}</div>,
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