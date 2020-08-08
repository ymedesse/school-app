import * as type from "./constants";

const actions = {
  setAddressesAction: payload => ({
    type: type.SET_ADDRESSES,
    payload
  }),
  setInAddressesAction: payload => ({
    type: type.SET_IN_ADRESSES,
    payload
  })
};

export default actions;
