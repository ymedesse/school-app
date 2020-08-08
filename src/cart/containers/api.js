import { API } from "../../config";

/**
 *
 * @param {*} userId
 * @param {*} token
 * @param {*} productId
 * @param {*} data {list, quantity}
 */

export const addToCartApi = async (userId, token, productId, data) => {
  return addFactory(userId, token, productId, data, "cart");
};

export const addToCommandeApi = async (userId, token, productId, data) => {
  return addFactory(userId, token, productId, data, "commande");
};

export const removeFromCartApi = async (userId, token, productId, list) => {
  return removeFromFactory(userId, token, productId, list, "cart");
};

export const removeFromCommandeApi = async (userId, token, productId, list) => {
  return removeFromFactory(userId, token, productId, list, "commande");
};

export const removeListInCartApi = async (userId, token, list) => {
  return removeListInCartFactory(userId, token, list, "cart");
};

export const removeListInCommandeApi = async (userId, token, list) => {
  return removeListInCartFactory(userId, token, list, "commande");
};

export const setCartQuantitiesInCartApi = async (userId, token, data) => {
  return setCartQuantitiesInCartFactory(userId, token, data, "cart");
};

export const setCartQuantitiesInCommandeApi = async (userId, token, data) => {
  return setCartQuantitiesInCartFactory(userId, token, data, "commande");
};

export const updateListNamesInCartApi = async (userId, token, data) => {
  return updateListNamesInFactory(userId, token, data, "cart");
};

export const updateListNamesInCommandeApi = async (userId, token, data) => {
  return updateListNamesInFactory(userId, token, data, "commande");
};

export const submitShippingApi = async (userId, token, shipping) => {
  return submitShippingFactory(userId, token, shipping, "cart");
};

export const submitCommandeApi = async (userId, token, shipping) => {
  return submitShippingFactory(userId, token, shipping, "commande");
};

const addFactory = async (userId, token, productId, data, file = "cart") => {
  try {
    const response = await fetch(`${API}/${file}/add/${productId}/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const removeFromFactory = async (
  userId,
  token,
  productId,
  list,
  file = "cart"
) => {
  try {
    const response = await fetch(
      `${API}/${file}/remove/${productId}/${userId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ list }),
      }
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const removeListInCartFactory = async (userId, token, list, file) => {
  try {
    const response = await fetch(`${API}/${file}/remove-content/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ list }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const setCartQuantitiesInCartFactory = async (userId, token, data, file) => {
  try {
    const response = await fetch(`${API}/${file}/updatequantities/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const updateListNamesInFactory = async (userId, token, data, file) => {
  try {
    const response = await fetch(`${API}/${file}/update-names/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const submitShippingFactory = async (userId, token, shipping, file) => {
  try {
    const response = await fetch(`${API}/${file}}/update-shipping/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(shipping),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
