import React, {Component}  from 'react';
import { graphql } from '@apollo/client/react/hoc'
import { gql } from '@apollo/client';

class TestSearchApollo extends Component {
    render() {
        if (this.props.data.loading) {
            return <div>Loading . . . </div>
        } else {
            return (this.props.data.genes.map((gene, index) => {
                return <div>{gene.symbol}</div>
        }))}
    }
};

export default graphql(gql`
    query GetGenes($geneSearch: String) {
        genes(symbol: $geneSearch) {
            id
            symbol
            name
        }
    }
`, {options: (props) => ({ variables: { geneSearch: props.geneSearch } })})(TestSearchApollo);
