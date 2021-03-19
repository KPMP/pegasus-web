export const formatNumberToPrecision = (number, precision) => {
    return number?number.toPrecision(precision):"N/A"
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