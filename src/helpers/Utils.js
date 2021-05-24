import { fetchDataTypesForConcept } from './ApolloClient';

export const formatNumberToPrecision = (number, precision) => {
    if (number) {
        return number.toPrecision(precision)
    } else {
        return "N/A"
    }
};

export const formatTissueType = (tissueType) => {
    switch (tissueType) {
        case "all":
            return "All samples";
        case "hrt":
            return "Healthy Reference";
        case "aki":
            return "AKI";
        case "ckd":
            return "CKD";
        default:
            return tissueType

    }
};

export const formatDataType = (dataType) => {
    switch (dataType) {
        case "sn":
            return "snRNASeq";
        case "sc":
            return "scRNASeq";
        default:
            return dataType

    }
};

export const median = (numbers) => {
    let clonedNumbers = [...numbers];
    let median = 0, numsLen = clonedNumbers.length;
    clonedNumbers.sort();
    if (numsLen % 2 === 0) {
        median = (clonedNumbers[numsLen / 2 - 1] + clonedNumbers[numsLen / 2]) / 2;
    } else {
        median = clonedNumbers[(numsLen - 1) / 2];
    }
    return median;
};

export const sum = (array, property) => {
    return array.reduce((finalSum, item) => finalSum + item[property], 0);
};

export const getTissueTypeOptions = (datasetSummary, value) => {
    const options = [
        {
            label: "All samples",
            value: "all",
            isDisabled: !datasetSummary.hrtCount > 0 || !datasetSummary.akiCount > 0 || !datasetSummary.ckdCount > 0
        },
        {
            label: "Healthy Reference",
            value: "hrt",
            isDisabled: !datasetSummary.hrtCount > 0
        },
        {
            label: "AKI",
            value: "aki",
            isDisabled: !datasetSummary.akiCount > 0
        },
        {
            label: "CKD",
            value: "ckd",
            isDisabled: !datasetSummary.ckdCount > 0
        }
    ];

    if (value) {
        return options.find(item => value === item.value).label
    } else {
        return options
    }
};

export const getDataTypeOptions = async (geneSymbol, cluster) => {
    let options = fetchDataTypesForConcept(geneSymbol, cluster).then((result) => {
        let dataTypes = result.dataTypesForConcept;
        const options = [
            {
                label: "snRNA-seq",
                value: "sn",
                isDisabled: !dataTypes.includes("sn")
            },
            {
                label: "scRNA-seq",
                value: "sc",
                isDisabled: !dataTypes.includes("sc")
            },
            {
                label: "Regional transcriptomics",
                value: "lmd",
                isDisabled: !dataTypes.includes("lmd")
            },
            {
                label: "Bulk RNA-seq",
                value: "bulk",
                isDisabled: !dataTypes.includes("bulk")
            },
            {
                label: "Regional proteomics",
                value: "lmd",
                isDisabled: !dataTypes.includes("lmd")
            },
            {
                label: "3D cytometry",
                value: "3dc",
                isDisabled: !dataTypes.includes("3dc")
            },
            {
                label: "Spatial metabolomics",
                value: "sm",
                isDisabled: !dataTypes.includes("sm")
            }
        ];
        return options;
    });
    return options;
};