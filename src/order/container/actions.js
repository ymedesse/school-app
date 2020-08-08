import * as type from "./constants";

const actions = {
  setCurrentOrderAction: (payload) => ({
    type: type.SET_CURRENT_ORDER,
    payload,
  }),
  // setShippingRangeAction: (payload) => ({
  //   type: type.SET_SHIPPING_RANGE,
  //   payload,
  // }),
};

export default actions;
