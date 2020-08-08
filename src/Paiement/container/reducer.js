import * as types from "./constants";

const orderInit = {
  shippingRange: {
    "min": 700,
    "max": 5000,
  },
  order: undefined,
};

const init = {
  ...orderInit,
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.SET_SHIPPING_RANGE:
      return { ...state, shippingRange: action.payload };
    case types.SET_NEW_ORDER:
      return { ...state, order: action.payload };
    default:
      return state;
  }
};

const key = "checkout";
export { key, init, orderInit };

export default reducer;
