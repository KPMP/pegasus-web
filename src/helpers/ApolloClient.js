import {ApolloClient, gql, InMemoryCache} from "@apollo/client";

export const apolloClient = new ApolloClient({
    uri: 'http://localhost:8080/graphql',
    cache: new InMemoryCache(),
    fetchOptions: {
        mode: 'no-cors',
    },
});

export const fetchGenes = async (searchString) => {

    if (searchString && searchString.trim().length < 2) {
        return [];
    }

    const response = await apolloClient.query({
        query: gql`
            query {
                genes(symbol: "${searchString}") {
                    id
                    symbol
                    name
                }
            }`
    });

    if (response.data && response.data.genes) {
        return response.data.genes.map(
            ({symbol, id}) => ({
                label: symbol,
                value: id
            })
        );
    }

    return [];
}