import { fetchDataTypesForConcept } from './ApolloClient';

export const formatNumberToPrecision = (number, precision, keepAsInt = false, dataType = "", enrollmentCategory = "") => {
    if (number) {
        return number.toPrecision(precision)
    } else if (number === 0) {
        return 0
    } else {
        if (dataType === "sn" && enrollmentCategory === "dmr") {
            return "-"
        }
        return "NS"
    }
};
export const formatEnrollmentCategory = (enrollmentCategory) => {
    switch (enrollmentCategory) {
        case "all":
            return "All samples";
        case "hrt":
            return "Healthy Reference";
        case "aki":
            return "AKI";
        case "ckd":
            return "CKD";
        case "dmr":
            return "DM-R";
        default:
            return enrollmentCategory

    }
};

export const formatDataType = (dataType) => {
    switch (dataType) {
        case "sn":
            return "snRNASeq";
        case "sc":
            return "scRNASeq";
        case "rt":
            return "Regional transcriptomics";
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

export const getEnrollmentCategoryOptions = (datasetSummary, geneSymbol, dataType) => {
    const options = [
        {
            label: "All samples",
            value: "all",
            isDisabled: !geneSymbol || (datasetSummary.hrtCount === 0 && datasetSummary.akiCount === 0
                && datasetSummary.ckdCount === 0 && datasetSummary.dmrCount === 0) || typeof datasetSummary.hrtCount !== 'number'
        },
        {
            label: "Healthy Reference",
            value: "hrt",
            isDisabled: !geneSymbol || !datasetSummary.hrtCount > 0 || typeof datasetSummary.hrtCount !== 'number' || dataType === "rp"
        },
        {
            label: "AKI",
            value: "aki",
            isDisabled: !geneSymbol || !datasetSummary.akiCount > 0 || typeof datasetSummary.akiCount !== 'number' || dataType === "rp"
        },
        {
            label: "CKD",
            value: "ckd",
            isDisabled: !geneSymbol || !datasetSummary.ckdCount > 0 || typeof datasetSummary.ckdCount !== 'number' || dataType === "rp"
        },
        {
            label: "DM-R",
            value: "dmr",
            isDisabled: !geneSymbol || !datasetSummary.dmrCount > 0 || typeof datasetSummary.dmrCount !== 'number' || dataType === "rp"
        }
    ];

    return options
};

export const getAllDataTypeOptions = () => {
    const options = [
        {
            label: "snRNA-seq",
            value: "sn",
            isDisabled: false
        },
        {
            label: "scRNA-seq",
            value: "sc",
            isDisabled: false,
        },
        {
            label: "Regional transcriptomics",
            value: "rt",
            isDisabled: false
        },
        {
          label: "Regional Proteomics",
          value: "rp",
          isDisabled: false
        }
    ];
    return options;
};

export const getDataTypeOptions = async (geneSymbol, cluster) => {
    let options = await fetchDataTypesForConcept(geneSymbol, cluster).then((result) => {
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
                value: "rt",
                isDisabled: !dataTypes.includes("rt")
            },
            {
                label: "Regional proteomics",
                value: "rp",
                isDisabled: !dataTypes.includes("rp")
            }
        ];
        return options;
    });
    return options;
};

export const getDataTypeOptionsWithEnrollmentCategory = async (geneSymbol, cluster, datasetSummary, currentEnrollmentCategory) => {
    let options = await getDataTypeOptions(geneSymbol, cluster, datasetSummary);
    for (let index in options) {
        for (let indexDS in datasetSummary) {
            const tissues = {
                "aki": datasetSummary[indexDS].akiCount,
                "ckd": datasetSummary[indexDS].ckdCount,
                "hrt": datasetSummary[indexDS].hrtCount,
                "dmr": datasetSummary[indexDS].dmrCount
            }
            if (options[index].value === datasetSummary[indexDS].dataTypeShort && tissues[currentEnrollmentCategory] === 0) {
                options[index].isDisabled = true
            }
        }
    }
    return options;
};

export const availableDataVisibilityFilter = (data) => {
    if ('hrtCount' in data && 'akiCount' in data && 'ckdCount' in data) {
        if (data.hrtCount > 0 || data.akiCount > 0 || data.ckdCount > 0 || data.dmrCount > 0) {
            return data;
        }
    }
    return undefined;
}
