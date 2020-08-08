import * as types from "./constants";

const cartInit = {
  contents: [],
  count: 0,
  total: 0,
  products: [],
};

const commandeInit = {
  contents: [],
  count: 0,
  total: 0,
  products: [],
};

const init = {
  cart: cartInit,
  commande: commandeInit,
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.SET_CART:
      return { ...state, cart: action.payload };
    case types.SET_COMMANDE:
      return { ...state, commande: action.payload };

    default:
      return state;
  }
};

const key = "cart";
export { key, init, cartInit, commandeInit };

export default reducer;
