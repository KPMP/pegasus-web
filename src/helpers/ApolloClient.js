import { ApolloClient, gql, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import packageJson from '../../package.json';
import 'isomorphic-unfetch';
import { sendMessageToBackend } from '../actions/Error/errorActions';
import { store } from '../App'


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

const httpLink = new HttpLink({
    uri: getBaseURL() + '/graphql'
});

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            store.dispatch(sendMessageToBackend(
                `GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`,
            )),
        );

    if (networkError) {
        let { response } = operation.getContext()

        if (response) {
            store.dispatch(sendMessageToBackend("Could not connect to GraphQL: " + networkError));
        } else {
            // No response received, user is probably attempting to navigate away during a data fetch
            const shouldUseRedirect = false;
            store.dispatch(sendMessageToBackend("Could not connect to GraphQL: " + networkError, shouldUseRedirect));
        }
    };
});

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache({ typePolicies: typePolicies }),
    link: from([errorLink, httpLink]),
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
    } else {
        store.dispatch(sendMessageToBackend("Could not retrieve gene data: " + response.error));
    }
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
    } else {
        store.dispatch(sendMessageToBackend("Could not retrieve autocomplete data: " + response.error));
    }
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
    else {
        store.dispatch(sendMessageToBackend("Could not retrieve cell type hierarchy data: " + response.error));
    }
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
                   isRegionalTranscriptomics
                   cellTypeId
                   clusterId
                   cellTypeOrder
                }
            }`
    });

    if (response.data && response.data.getClusterHieararchies) {
        return response.data.getClusterHieararchies;
    } else {
        store.dispatch(sendMessageToBackend("Could not retrieve cluster data: " + response.error));
    }
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
                    hrtCount
                    akiCount
                    ckdCount
                    participantCount
                }
            }`
    });
    if (response.data && response.data.getGeneDatasetInformation) {
        return response.data.getGeneDatasetInformation;
    } else {
        store.dispatch(sendMessageToBackend("Could not retrieve Gene Dataset: " + response.error));
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
    } else {
        store.dispatch(sendMessageToBackend("Could not retrieve UMAP plot data: " + response.error));
    }
}

export const fetchDataTypesForConcept = async (geneSymbol, clusterName) => {
    const response = await apolloClient.query({
        query: gql`
            query{
                dataTypesForConcept(geneSymbol:"${geneSymbol}", clusterName: "${clusterName}") 
            }`
    });
    if (response.data && response.data) {
        return response.data;
    } else {
        store.dispatch(sendMessageToBackend("Could not retrieve data types: " + response.error));
    }
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
    } else {
        store.dispatch(sendMessageToBackend("Could not retrieve gene expression data: " + response.error));
    }
};

export const fetchRegionalTranscriptomics = async (comparisonType, geneSymbol) => {
    let query = gql`
        query {
            getRTGeneExpressionByTissue(comparisonType:"${comparisonType}", geneSymbol: "${geneSymbol}") {
                aki {
                    id
                    segment
                    geneSymbol
                    pVal
                    foldChange
                    pValLog10
                    stdDev
                    sampleCount
                    tissueType
                }
                ckd {
                    id
                    segment
                    geneSymbol
                    pVal
                    foldChange
                    pValLog10
                    stdDev
                    sampleCount
                    tissueType
                }
                all {
                    id
                    segment
                    geneSymbol
                    pVal
                    foldChange
                    pValLog10
                    stdDev
                    sampleCount
                    tissueType
                }
                hrt {
                    id
                    segment
                    geneSymbol
                    pVal
                    foldChange
                    pValLog10
                    stdDev
                    sampleCount
                    tissueType
                }
            }
        }`;

    const response = await apolloClient.query({
        query: query,
        fetchPolicy: 'cache-first'
    });

    if (response.data && response.data.getRTGeneExpressionByTissue) {
        return response.data.getRTGeneExpressionByTissue;
    } else {
        store.dispatch(sendMessageToBackend("Could not retrieve regional transcriptomics data: " + response.error));
    }

};

export const fetchRegionalTranscriptomicsByStructure = async (structure) => {
    let query = gql`
        query {
            getRTGeneExpressionByStructure(structure: "${structure}") {
                id
                segment
                geneSymbol
                pVal
                foldChange
                pValLog10
                stdDev
                sampleCount
                tissueType
            }
        }`;

    const response = await apolloClient.query({
        query: query,
        fetchPolicy: 'cache-first'
    });

    if (response.data && response.data.getRTGeneExpressionByStructure) {
        return response.data.getRTGeneExpressionByStructure;
    } else {
        store.dispatch(sendMessageToBackend("Could not retrieve regional transcriptomics data: " + response.error));
    }
}


