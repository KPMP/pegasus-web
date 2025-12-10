import actionNames from "../actionNames";

export const setFeatureSCData = (scSwitch) => {
  return {
    type: actionNames.SET_SC_SWITCH,
    payload: scSwitch
  }
}
