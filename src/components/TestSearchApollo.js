import React from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'
import { useQuery, gql } from '@apollo/client';

const GENE_QUERY = gql`
    query GetGenes {
        genes(symbol: "EGF") {
            id
            symbol
            name
        }
    }
`;

const TestSearchApollo = () => {
    const { loading, error, data } = useQuery(GENE_QUERY);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return data.genes.map((gene, index) => {return <div>{gene.symbol}</div>})

};

export default TestSearchApollo
