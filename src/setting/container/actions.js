import * as type from "./constants";

const actions = {
  setSettings: (payload) => ({
    type: type.SET_SETTING,
    payload,
  }),
};

export default actions;
