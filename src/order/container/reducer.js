import * as types from "./constants";

const orderInit = {
  orders: undefined,
  currentOrder: undefined,
};

const init = {
  ...orderInit,
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.SET_CURRENT_ORDER:
      return { ...state, currentOrder: action.payload };
    default:
      return state;
  }
};

const key = "order";
export { key, init, orderInit };

export default reducer;
