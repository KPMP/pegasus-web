import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
import packageJson from '../../package.json';
import 'isomorphic-unfetch'

const isDevelopment = () => {
    return process.env.NODE_ENV === "development";
};

const getBaseURL = () => {
    if (isDevelopment()) {
        return packageJson.proxy;
    }
    return '';
};

export const apolloClient = new ApolloClient({
    uri: getBaseURL() + '/graphql',
    cache: new InMemoryCache(),
    fetchOptions: {
        fetchOptions: { fetch },
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

export const fetchCellTypeHierarchy = async() => {
    const response = await apolloClient.query({
        query: gql`
            query {
                cellTypeHierarchy {
                    cellTypeRegions {
                        regionName
                        cellTypeSubregions {
                            subregionName
                            cellTypeNames
                        }
                    }
                } 
            }`
    });

    if (response.data && response.data.cellTypeHierarchy) {
        return response.data.cellTypeHierarchy;
    }
    
    return undefined;
};

export const fetchUMAPPoints = async(dataType, geneSymbol) => {
    const response = await apolloClient.query({
        query: gql`
            query {
                umapPoints(dataType: "${dataType}", geneSymbol: "${geneSymbol}") {
                    umapX
                    umapY
                    clusterColor
                    clusterName
                    dataType
                    expressionValue
                }
            }`
    });

    if (response.data && response.data.umapPoints) {
        return response.data.umapPoints;
    }

    return [];
};


export const fetchGeneExpression = async (dataType, geneSymbol, cellType, tissueType) => {
    const response = await apolloClient.query({
        query: gql`
            query {
                geneExpressionSummary(dataType:"${dataType}", geneSymbol:"${geneSymbol}", cellType:"${cellType}", tissueType:"${tissueType}") {
                    id
                    tissueType
                    gene
                    pVal
                    pValAdj
                    foldChange
                    pct1
                    pct2
                    avgExp
                    cluster
                    clusterName
                    cellCount
                    dataType
                }
            }`
    });

    if (response.data && response.data.geneExpressionSummary) {
        return response.data.geneExpressionSummary;
    }
    return [];
};