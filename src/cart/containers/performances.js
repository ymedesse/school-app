import actions from "./actions";
import { cartInit, commandeInit } from "./reducer";
import { fetcherWithToken } from "../../utils/fecthers";
import { API } from "../../config";

import {
  addToCartApi,
  removeFromCartApi,
  removeListInCartApi,
  setCartQuantitiesInCartApi,
  updateListNamesInCartApi,
  addToCommandeApi,
  removeFromCommandeApi,
  removeListInCommandeApi,
  setCartQuantitiesInCommandeApi,
  updateListNamesInCommandeApi,
} from "./api";

const authPerformances = (dispatch, auth) => {
  const getFunc = (file, cartFunc, cmdFunc) => {
    const isCommande = file === "commande";
    return isCommande ? cmdFunc : cartFunc;
  };
  const setDispatchAction = async (file, data) => {
    file === "commande"
      ? dispatch(actions.setCommandeAction(data))
      : dispatch(actions.setCartAction(data));
  };

  /**
   *
   * @param {*} id
   * @param {object} data {quantity, listId}
   * @param {*} next
   */
  const addToCart = (id, data, next = () => {}, file = "cart") => {
    const func = getFunc(file, addToCartApi, addToCommandeApi);

    const { user, token } = auth;

    func(user._id, token, id, data).then(async (data) => {
      if (data) {
        if (data.error) {
          console.log(data.error);
        } else {
          setDispatchAction(file, data);
          next && next(data);
        }
      } else console.log("something is wrong", { data });
    });
  };

  const removeFromCart = (id, listId, next = () => {}, file = "cart") => {
    const func = getFunc(file, removeFromCartApi, removeFromCommandeApi);

    const { user, token } = auth;
    func(user._id, token, id, listId).then(async (data) => {
      if (data) {
        if (data.error) {
          console.log(data.error);
        } else {
          setDispatchAction(file, data);
          next && next();
        }
      } else console.log("something is wrong", { data });
    });
  };

  const removeListInCart = (id, listId, next = () => {}, file) => {
    const { user, token } = auth;
    const func = getFunc(file, removeListInCartApi, removeListInCommandeApi);

    func(user._id, token, listId).then(async (data) => {
      if (data) {
        if (data.error) {
          console.log(data.error);
        } else {
          setDispatchAction(file, data);
          next && next();
        }
      } else console.log("something is wrong", { data });
    });
  };

  const updateListNamesInCart = (id, items, next = () => {}, file) => {
    const { user, token } = auth;

    const func = getFunc(
      file,
      updateListNamesInCartApi,
      updateListNamesInCommandeApi
    );

    func(user._id, token, items).then(async (data) => {
      if (data) {
        if (data.error) {
          console.log(data.error);
        } else {
          setDispatchAction(file, data);
          next && next();
        }
      } else console.log("something is wrong", { data });
    });
  };

  const setCartQuantities = async (items, file, next = () => {}) => {
    return setCartQuantitiesSec(items, file, (data) => {
      setDispatchAction(file, data);
      next && next(data);
    });
  };

  const setCartQuantitiesOnly = async (items, file, next) => {
    return setCartQuantitiesSec(items, file, (data) => {
      next && next(data);
    });
  };

  const setCartQuantitiesSec = async (items, file, next = () => {}) => {
    const { user, token } = auth;

    const func = getFunc(
      file,
      setCartQuantitiesInCartApi,
      setCartQuantitiesInCommandeApi
    );

    func(user._id, token, items).then(async (data) => {
      if (data) {
        if (data.error) {
          console.log(data.error);
        } else {
          next && next(data);
        }
      } else console.log("something is wrong", { data });
    });
  };

  const completeCart = () => {
    // dispatch(actions.completeAction({}));
  };

  const setCart = (cart) => {
    dispatch(actions.setCartAction(cart));
  };
  const setCommande = (cart) => {
    dispatch(actions.setCommandeAction(cart));
  };

  const setCartFromUserInfo = async (data, oldCart, oldCmd) => {
    if (data && !data.error) {
      let { cart, commande } = data;
      setCartCmde(cart, oldCart, cartInit, (val) =>
        dispatch(actions.setCartAction(val))
      );

      setCartCmde(commande, oldCmd, commandeInit, (val) =>
        dispatch(actions.setCommandeAction(val))
      );
    }
  };

  const getFetcher = () => {
    const { token } = auth;
    const fetcher = (link) => fetcherWithToken(link, token);
    return fetcher;
  };

  const getReadCartUrl = (file = "cart") => {
    const { user } = auth;
    return `${API}/${file}/${user._id}`;
  };

  return {
    addToCart,
    removeFromCart,
    setCartQuantities,
    setCartQuantitiesOnly,
    completeCart,
    setCart,
    setCommande,
    setCartFromUserInfo,
    removeListInCart,
    updateListNamesInCart,
    getFetcher,
    getReadCartUrl,
  };
};

export default authPerformances;

const getComparableValue = async (cart) => {
  const { totalDetail } = cart;
  const products = await getAllProduct(cart);
  return JSON.stringify({ products, totalDetail });
};

const getAllProduct = async (cart) => {
  const { contents = [] } = cart;
  const all = [];
  for (let i = 0; i < contents.length; i++) {
    const content = contents[i];
    const { products } = content;
    for (let i = 0; i < products.length; i++) {
      const element = products[i];
      const { _id, name, slug, totalDetail } = element;
      all.push({ _id, name, slug, totalDetail });
    }
  }
  return all;
};

const setCartCmde = async (cartCmd, oldCartCmd, init, dispatcher) => {
  const natCartCmde = cartCmd === null || !cartCmd ? init : cartCmd;

  const compOldCart = await getComparableValue(oldCartCmd);
  const compNewCart = await getComparableValue(natCartCmde);
  if (compOldCart !== compNewCart) {
    await dispatcher(natCartCmde);
  }
};
