import actionNames from "../actionNames";

export const setFeatureSNData = (snSwitch) => {
    return {
        type: actionNames.SET_SN_SWITCH,
        payload: snSwitch
    }
};

export const setFeatureSCData = (scSwitch) => {
  return {
    type: actionNames.SET_SC_SWITCH,
    payload: scSwitch
  }
}
