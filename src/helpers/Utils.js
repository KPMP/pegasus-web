export const formatNumberToPrecision = (number, precision, blanks = false) => {
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

export const getTissueTypeOptions = (value) => {
    const options =  [
        {
            label: "All samples",
            value: "all"
        },
        {
            label: "Healthy Reference",
            value: "hrt"
        },
        {
            label: "AKI",
            value: "aki"
        },
        {
            label: "CKD",
            value: "ckd"
        }
    ];

    if (value) {
        return options.find(item => value === item.value).label
    } else {
        return options
    }
};

export const getDataTypeOptions = (value) => {
    const options =  [
        {
            label: "SN RNAseq",
            value: "sn"
        },
        {
            label: "SC RNAseq",
            value: "sc"
        },
        {
            label: "LMD RNASeq",
            value: "lmd",
            isDisabled: true
        },
        {
            label: "Bulk RNASeq",
            value: "bulk",
            isDisabled: true
        },
        {
            label: "LMD Proteomics",
            value: "lmd",
            isDisabled: true
        },
        {
            label: "3D Cytometry",
            value: "3dc",
            isDisabled: true
        },
        {
            label: "Spatial Metabolomics",
            value: "sm",
            isDisabled: true
        }
    ];

    if (value) {
        return options.find(item => value === item.value).label
    } else {
        return options
    }
};