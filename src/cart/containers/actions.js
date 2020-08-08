import * as type from "./constants";

const actions = {
  setCartAction: (payload) => ({
    type: type.SET_CART,
    payload,
  }),
  setCommandeAction: (payload) => ({
    type: type.SET_COMMANDE,
    payload,
  }),
};

export default actions;
