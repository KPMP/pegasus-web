import { fetchDataTypesForConcept2025 } from './ApolloClient';
import CellTypeEnum from '../components/Explorer/CellTypeEnum';

export const formatNumberToPrecision = (number, precision, keepAsInt = false, dataType = "", enrollmentCategory = "") => {
    if (number) {
        return number.toPrecision(precision)
    } else if (number === 0) {
        return 0
    } else {
        if ((dataType === "sn" && enrollmentCategory === "dmr") || (dataType === "sc" && enrollmentCategory === "dmr")) {
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

export const getDataTypeOptions2025 = async (geneSymbol, cluster, featureSTData) => {
    let options = await fetchDataTypesForConcept2025(geneSymbol, cluster).then((result) => {
        let dataTypes = result.dataTypesForConcept2025;
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
            },
            
        ];
        if (featureSTData) {
            options.push({
                label: "Spatial Transcriptomics",
                value: "st",
                isDisabled: false
            })
        }
        return options;
    });
    return options;
};

export const getDataTypeOptionsWithEnrollmentCategory = async (geneSymbol, cluster, datasetSummary, currentEnrollmentCategory) => {
    let options = await getDataTypeOptions2025(geneSymbol, cluster, datasetSummary);
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



export const svgToCellMap = {
    "Epithelial_Cell_Proximal_Tubule": CellTypeEnum.PROXIMAL_TUBULEL,
    "Glomerular_Mesangial_Cell": CellTypeEnum.MESANGIUM,
    "Parietal_Epithelial_Cell": CellTypeEnum.PARIETAL,
    "Glomerular_Visceral_Epithelial_Cell": CellTypeEnum.VISCERAL_EPITHELIUM,
    "Glomerular_Capillary_Endothelial_Cell": CellTypeEnum.GLOMERULAR,
    "Proximal_Tubule": CellTypeEnum.PROXIMAL_TUBULEL,
    "Connecting_Tubule": CellTypeEnum.CONNECTING_TUBULE,
    "Collecting_Duct": CellTypeEnum.COLLECTING_DUCT,
    "Descending_Thin_Limb_Of_Loop_Of_Henle": CellTypeEnum.DESCENDING_THIN_LIMB_LOOP_OF_HENLE,
    "Ascending_Thin_Limb_Of_Loop_Of_Henle": CellTypeEnum.ASCENDING_THIN_LIMB_LOOP_OF_HENLE,
    "Thick_Ascending_Limb_Of_Loop_Of_Henle": CellTypeEnum.THICK_ASCENDING_LIMB_LOOP_OF_HENLE,
};

export const cellMapToOntologyId = {
    "Glomerular Parietal Epithelium": "CL_1000452",
    "Parietal Epithelial Cell": "CL_1000452",
    "Glomerular Mesangium": "CL_1000742",
    "Mesangial Cell": "CL_1000742",
    "Glomerular Capillary Endothelium": "CL_1001005",
    "Glomerular Capillary Endothelial Cell": "CL_1001005",
    "Proximal Tubule": "CL_0002306",
    "Glomerular Visceral Epithelium": "CL_0000653",
    "Potocyte": "CL_000653",
    "Proximal Tubule": "CL_4030009",
    "Proximal Tubule Epithelial Cell":"CL_4030009",
    "Proximal Tubule Epithelial Cell Segment 1": 'CL_4030009',
    "Proximal Tubule Epithelial Cell Segment 1/Segment 2": "CL_4030009",
    "Proximal Tubule Epithelial Cell Segment 2": "CL_4030009",
    "Proximal Tubule Epithelial Cell Segment 2/Segment 3": "CL_4030009",
    "Proximal Tubule Epithelial Cell Segment 3":"CL_4030009",
    "Loop of Henle (Thin Limb)":{"Ascending": "UBERON_0004193", "Descending": "UBERON_0005096"},
    "Descending Thin Limb of Loop of Henle": "UBERON_0005096",
    "Ascending Thin Limb of Loop of Henle": "UBERON_0004193",
    "Loop of Henle (Thick Limb)": "UBERON_0001291",
    "Thick Ascending Limb of Loop of Henle": "UBERON_0001291",
    "Cortical Thick Ascending Limb of Loop of Henle": "UBERON_0001291",
    "Cortico-Medullary Thick Ascending Limb of Loop of Henle Cell":"UBERON_0001291",
    "Medullary Thick Ascending Limb of Loop of Henle Cell": "UBERON_0001291",
    "Macula Densa Cell": "", //this doesn't have an ontologyId from HubMap yet. So we can't highlight this.
    "Distal Convolution": "", //this doesn't have an ontologyId from HubMap yet. So we can't highlight this yet
    "Distal Convoluted Tubule Cell": "",
    "Distal Convoluted Tubule Cell Type 1":"",
    "Distal Convoluted Tubule Cell Type 2":"",
    "Connecting Tubule":"CL_1000768",
    "Connecting Tubule Cell":"CL_1000768",
    "Connecting Tubule Principal Cell":"CL_1000768",
    "Collecting Duct":["CL_1000718", "CL_1000716","CL_1000714"],
    "Cortical Principal Cell":"CL_1000714",
    "Distal Nephron":["","CL_1000768", "CL_1000718"],
    "Cortical Collecting Duct Principal Cell":"CL_1000714",
    "Principal-Intercalated Cell": {"Outer Medullary Collecting Duct Cell":"CL_1000716", "Inner Medullary Collecting Duct Cell":"CL_1000718"},
    "Intercalated Cell":{"Outer Medullary Collecting Duct Cell":"CL_1000716", "Inner Medullary Collecting Duct Cell":"CL_1000718"},
    "Intercalated Cell Type A":{"Outer Medullary Collecting Duct Cell":"CL_1000716", "Inner Medullary Collecting Duct Cell":"CL_1000718"},
    "Intercalated Cell Type B": "CL_1000714",
    "Cortical Collecting Duct Intercoalated Cell Type A": "CL_1000714",
    "Collecting Duct Intercalated Cell Type A":{"Outer Medullary Collecting Duct Cell":"CL_1000716", "Inner Medullary Collecting Duct Cell":"CL_1000718"},
    "Outer Medullary Collecting Duct Intercalated Cell Type A": "CL_1000716",
    "Outer Medullary Collecting Duct Principal Cell":"CL_1000716",
    "Outer Medullary Collecting Duct Principal-Intercalated Cell": "CL_1000716",
    "Medullary Principal Cell": "CL_1000716",
    "Inner Medullary Collecting Duct Cell":"CL_1000718",
    "Papillary Tip Epithelial":"",
    "Papillary Tip Epithelial Cell":""
}