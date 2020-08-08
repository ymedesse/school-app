import * as type from "./constants";

const actions = {
  setErrorAction: payload => ({
    type: type.SET_ERROR,
    payload
  }),
  setSucessAction: payload => ({
    type: type.SET_SUCCESS,
    payload
  }),
  initializeAction: payload => ({
    type: type.INITIALIZE,
    payload
  })
};

export default actions;
