import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
import packageJson from '../../package.json';

export const apolloClient = new ApolloClient({
    uri: getBaseURL() + '/graphql',
    cache: new InMemoryCache(),
    fetchOptions: {
        mode: 'no-cors',
    },
});

export const fetchGenes = async (searchString) => {

    const response = await apolloClient.query({
        query: gql`
            query {
                genes(symbol: "${searchString}") {
                    id
                    symbol
                    name
                    alias
                }
            }`
    });

    if (response.data && response.data.genes) {
        return response.data.genes;
    }

    return [];
};

export const fetchAutoComplete = async (searchString) => {

    if (searchString && searchString.trim().length < 3) {
        return [];
    }

    const response = await apolloClient.query({
        query: gql`
            query {
                autocomplete(searchTerm: "${searchString}") {
                    value
                    name
                    type
                    id
                    aliases
                }
            }`
    });

    if (response.data && response.data.autocomplete) {
        return response.data.autocomplete;
    }

    return [];
};

const getBaseURL = () => {
    if (this.isDevelopment()) {
        return packageJson.proxy;
    }
    return '';
};

const isDevelopment = () => {
    return process.env.NODE_ENV === "development";
};
