import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import packageJson from '../../package.json';
import 'isomorphic-unfetch';

const isDevelopment = () => {
    return process.env.NODE_ENV === "development";
};

const getBaseURL = () => {
    if (isDevelopment()) {
        return packageJson.proxy;
    }
    return '';
};

const typePolicies = {
    GeneExpressionSummary: {
        keyFields: ["gene", "tissueType", "cluster", "dataType"]
    }
};

export const apolloClient = new ApolloClient({
    uri: getBaseURL() + '/graphql',
    cache: new InMemoryCache({ typePolicies: typePolicies }),
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

export const fetchCellTypeHierarchy = async () => {
    const response = await apolloClient.query({
        query: gql`
            query {
                cellTypeHierarchy {
                    cellTypeRegions {
                        regionName
                        cellTypeSubregions {
                            subregionName
                            cellTypes {
                                cellType
                            }
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

export const fetchClusterHierarchy = async (cellType) => {
    const response = await apolloClient.query({
        query: gql`
            query {
                getClusterHieararchies(cellType: "${cellType}") {
                   cellType
                   clusterName
                   structureRegion
                   structureSubregion
                   isSingleNucCluster
                   isSingleCellCluster
                   cellTypeId
                   clusterId 
                }
            }`
    });

    if (response.data && response.data.getClusterHieararchies) {
        return response.data.getClusterHieararchies;
    }

    return undefined;
}

export const fetchGeneDatasetSummary = async (geneSymbol) => {
    const response = await apolloClient.query({
        query: gql`
            query {
                getGeneDatasetInformation(geneSymbol: "${geneSymbol}")
                 {
                    omicsType
                    dataType
                    dataTypeShort
                    hrt
                    aki
                    ckd
                    all
                }
            }`
    });

    if (response.data && response.data.getGeneDatasetInformation) {
        delete response.data.getGeneDatasetInformation[0]["__typename"]
        return [response.data.getGeneDatasetInformation[0]];
    }

    return undefined;
}

export const fetchPlotlyData = async (dataType, geneSymbol, tissueType, fetchPolicy = 'cache-first') => {

    const query = gql`
        query {
            getUmapPlotData(dataType: "${dataType}", geneSymbol: "${geneSymbol}", tissueType: "${tissueType}") {
                referenceData {
                    xValues
                    yValues
                    clusterName
                    color
                    clusterAbbreviation
                }
                featureData {
                    xValues
                    yValues
                    expression
                    hoverDisplay
                }
            }
        }`;

    const response = await apolloClient.query({
        query: query,
        fetchPolicy: fetchPolicy
    });

    if (response.data && response.data.getUmapPlotData) {
        return response.data.getUmapPlotData;
    }

    return [];
};

export const fetchDataTypesForConcept = async (geneSymbol, clusterName) => {
    const response = await apolloClient.query({
        query: gql`
            query{
                dataTypesForConcept(geneSymbol:"${geneSymbol}", clusterName: "${clusterName}") 
            }`
    });
    if (response.data && response.data) {
        return response.data;
    }
    return [];
}

export const fetchGeneExpression = async (dataType, geneSymbol, cellType, tissueType, fetchPolicy = 'cache-first') => {
    let query = gql`
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
        }`;

    const response = await apolloClient.query({
        query: query,
        fetchPolicy: fetchPolicy
    });

    if (response.data && response.data.geneExpressionSummary) {
        return response.data.geneExpressionSummary;
    }
    return [];
};

