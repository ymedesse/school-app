import * as type from "./constants";

const actions = {
  setNewOrderAction: (payload) => ({
    type: type.SET_NEW_ORDER,
    payload,
  }),
  setShippingRangeAction: (payload) => ({
    type: type.SET_SHIPPING_RANGE,
    payload,
  }),
};

export default actions;
