import { ApolloClient, gql, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import packageJson from '../../package.json';
import 'isomorphic-unfetch';
import { sendMessageToBackend } from '../actions/Error/errorActions';
import { store } from '../App';

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
        keyFields: ["gene", "enrollmentCategory", "cluster", "dataType"]
    }
};

const httpLink = new HttpLink({
    uri: getBaseURL() + '/graphql'
});

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            store.dispatch(sendMessageToBackend(
                `GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`,true
            )),
        );

    if (networkError) {
        let { response } = operation.getContext()

        if (response) {
            store.dispatch(sendMessageToBackend("Could not connect to GraphQL: " + networkError, true));
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

export const fetchAutoComplete = async (searchString) => {

    if (searchString && searchString.trim().length < 2) {
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
        store.dispatch(sendMessageToBackend("Could not retrieve autocomplete data: " + response.error, true));
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
                   isRegionalProteomics
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

export const fetchDataTypeSummaryInformation2025 = async (fetchPolicy = 'no-cache') => {
    const query = gql`
      query {
                getDataTypeSummaryInformation2025
                 {
                    omicsType
                    dataType
                    dataTypeShort
                    hrtCount
                    akiCount
                    ckdCount
                    dmrCount
                    totalCount
                    participantCount
                }
            }`;
    const response = await apolloClient.query({
        query: query,
        fetchPolicy: fetchPolicy
    });
    if (response.data) {
        return response.data;
    } else {
        console.log('response.error',response.error)
        console.log(response)
        store.dispatch(sendMessageToBackend("Could not retrieve Gene Dataset: " + response.error));
    }

    return undefined;
}

export const fetchDataTypeSummaryInformation = async (fetchPolicy = 'no-cache') => {
    const query = gql`
      query {
                getDataTypeSummaryInformation
                 {
                    omicsType
                    dataType
                    dataTypeShort
                    hrtCount
                    akiCount
                    ckdCount
                    dmrCount
                    totalCount
                    participantCount
                }
            }`;
    const response = await apolloClient.query({
        query: query,
        fetchPolicy: fetchPolicy
    });
    if (response.data && response.data.getDataTypeSummaryInformation) {
        return response.data.getDataTypeSummaryInformation;
    } else {
        console.log('response.error',response.error)
        store.dispatch(sendMessageToBackend("Could not retrieve Gene Dataset: " + response.error));
    }

    return undefined;
}

export const fetchPlotlyData2025 = async(dataType, geneSymbol, enrollmentCategory, fetchPolicy='cache-first') => {
     const query = gql`
            query {
            getUmapPlotData2025(dataType: "${dataType}", geneSymbol: "${geneSymbol}", enrollmentCategory: "${enrollmentCategory}") {
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



export const fetchPlotlyData = async (dataType, geneSymbol, enrollmentCategory, fetchPolicy = 'cache-first') => {
    const query = gql`
        query {
            getUmapPlotData(dataType: "${dataType}", geneSymbol: "${geneSymbol}", enrollmentCategory: "${enrollmentCategory}") {
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

export const fetchGeneExpression = async (dataType, geneSymbol, cellType, enrollmentCategory) => {
    const query = gql`
        query {
             geneExpressionSummary(
				dataType: "${dataType}",
				geneSymbol: "${geneSymbol}",
				cellType: "${cellType}",
				enrollmentCategory: "${enrollmentCategory}"
				) {
					id
					enrollmentCategory
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
        query: query
    });

	if(response.data && response.data.geneExpressionSummary) {
		return response.data.geneExpressionSummary;
	} else {
		store.dispatch(sendMessageToBackend("Could not retrieve gene expression data: " + response.error));
	}
};


export const fetchGeneExpression2025 = async (dataType, geneSymbol, cellType, enrollmentCategory) => {
    const query = gql`
        query {
             geneExpressionSummary2025(
				dataType: "${dataType}",
				geneSymbol: "${geneSymbol}",
				cellType: "${cellType}",
				enrollmentCategory: "${enrollmentCategory}"
				) {
					id
					enrollmentCategory
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
        query: query
    });

	if(response.data && response.data.geneExpressionSummary) {
		return response.data.geneExpressionSummary;
	} else {
		store.dispatch(sendMessageToBackend("Could not retrieve gene expression data: " + response.error));
	}
};


export const fetchRegionalTranscriptomics = async (comparisonType, geneSymbol) => {
    let query = gql`
        query {
            getRTGeneExpressionByEnrollment(comparisonType:"${comparisonType}", geneSymbol: "${geneSymbol}") {
                aki {
                    id
                    segment
                    segmentName
                    geneSymbol
                    pVal
                    foldChange
                    pValLog10
                    stdDev
                    sampleCount
                    enrollmentCategory
                    pValAdj: adjPVal

                }
                ckd {
                    id
                    segment
                    segmentName
                    geneSymbol
                    pVal
                    foldChange
                    pValLog10
                    stdDev
                    sampleCount
                    enrollmentCategory
                    pValAdj: adjPVal
                }
                all {
                    id
                    segment
                    segmentName
                    geneSymbol
                    pVal
                    foldChange
                    pValLog10
                    stdDev
                    sampleCount
                    enrollmentCategory
                    pValAdj: adjPVal
                }
                hrt {
                    id
                    segment
                    segmentName
                    geneSymbol
                    pVal
                    foldChange
                    pValLog10
                    stdDev
                    sampleCount
                    enrollmentCategory
                    pValAdj: adjPVal
                }
            }
        }`;

    const response = await apolloClient.query({
        query: query,
        fetchPolicy: 'cache-first'
    });

    if (response.data && response.data.getRTGeneExpressionByEnrollment) {
        return response.data.getRTGeneExpressionByEnrollment;
    } else {
        store.dispatch(sendMessageToBackend("Could not retrieve regional transcriptomics data: " + response.error));
    }

};

export const fetchRegionalProteomics = async (geneSymbol) => {
    let query = gql`
        query {
            getRPGeneExpressionByEnrollment(geneSymbol: "${geneSymbol}") {
                accession
                rpExpressionByEnrollmentCategory {
                  all {
                        id
                        geneSymbol
                        fdrConfidence
                        accession
                        description
                        coveragePct
                        numPeptides
                        numUniquePeptides
                        comparison
                        segment: region
                        foldChange
                        pValLog10: adjPVal
                        enrollmentCategory
                        sampleCount
                  }
                }
            }
        }`;

    const response = await apolloClient.query({
        query: query,
        fetchPolicy: 'cache-first'
    });

    if (response.data && response.data.getRPGeneExpressionByEnrollment) {
        return response.data.getRPGeneExpressionByEnrollment;
    } else {
        store.dispatch(sendMessageToBackend("Could not retrieve regional proteomics  data: " + response.error));
    }

};

export const fetchRegionalTranscriptomicsByStructure = async (structure) => {
    let query = gql`
        query {
            getRTGeneExpressionByStructure(structure: "${structure}") {
                id
                segment
                segmentName
                gene: geneSymbol
                pVal
                foldChange
                pValLog10
                stdDev
                sampleCount
                enrollmentCategory
                pValAdj: adjPVal
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

export const fetchRegionalProteomicsByStructure = async (structure) => {
    let query = gql`
        query {
            getRPGeneExpressionByStructure(structure: "${structure}") {
                id
                gene: geneSymbol
                fdrConfidence
                accession
                description
                coveragePct
                numPeptides
                numUniquePeptides
                comparison
                segment: region
                foldChange
                pValAdj: adjPVal
                enrollmentCategory
                sampleCount
            }
        }`;

    const response = await apolloClient.query({
        query: query,
        fetchPolicy: 'cache-first'
    });

    if (response.data && response.data.getRPGeneExpressionByStructure) {
        return response.data.getRPGeneExpressionByStructure;
    } else {
        store.dispatch(sendMessageToBackend("Could not retrieve regional proteomics data: " + response.error));
    }
}

export const fetchSummaryData = async (dataType) => {
    let query = gql`
        query {
            getSummaryData {
                omicsType
                dataType
                dataTypeShort
                hrtCount
                akiCount
                ckdCount
                dmrCount
                totalCount
                participantCount
            }
        }`;

    const response = await apolloClient.query({
        query: query,
        fetchPolicy: 'cache-first'
    });

    if (response.data && response.data.getSummaryData) {
        return response.data.getSummaryData;
    } else {
        store.dispatch(sendMessageToBackend("Could not retrieve summary: " + response.error));
    }
}

export const fetchEnrollmentCategorySummaryCounts = async () => {
    let query = gql`
        query {
            getEnrollmentCategorySummaryData {
                akiCount
                ckdCount
                hrtCount
                dmrCount
            }
        }`;
    const response = await apolloClient.query({
        query: query,
        fetchPolicy: 'cache-first'
    });
    if (response.data && response.data.getEnrollmentCategorySummaryData) {
        return response.data.getEnrollmentCategorySummaryData[0];
    }else {
        store.dispatch(sendMessageToBackend("Could not retrieve enrollment category summary: " + response.error));
    }
}

export const fetchAtlasSummaryRows = async () => {
    let query = gql`
        query {
          getAtlasSummaryRows {
            totalFiles
            summaryRows {
              akiCount
              ckdCount
              hrtCount
              dmrCount
              totalCount
              omicsType
              linkInformation {
                linkType
                linkValue
              }
            }
          }
        }`;
    const response = await apolloClient.query({
        query: query,
        fetchPolicy: 'cache-first'
    });
    if (response.data && response.data.getAtlasSummaryRows) {
        return response.data.getAtlasSummaryRows;
    }else {
        store.dispatch(sendMessageToBackend("Could not retrieve file counts: " + response.error));
    }
}
