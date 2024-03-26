import actionNames from "../actionNames";

export const setAccession = (accession) => {
  return {
    type: actionNames.SET_ACCESSION,
    payload: accession,
  };
};
