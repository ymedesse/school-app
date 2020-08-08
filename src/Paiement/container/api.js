import { API } from "../../config";
//Adsress

export const getAddresses = async (userId, token) => {
  try {
    const response = await fetch(`${API}/braintree/getToken/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

// Pyment
export const getBraintreeClientToken = async (userId, token) => {
  try {
    const response = await fetch(`${API}/braintree/getToken/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const processPaymentApi = async (userId, token, paymentData) => {
  try {
    const response = await fetch(`${API}/qos/payment/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(paymentData),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const checkPaymentStausApi = async (userId, token, data) => {
  try {
    const response = await fetch(`${API}/qos/checkstatus/${userId}`, {
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

export const createOrderApi = async (userId, token, orderData) => {
  try {
    const response = await fetch(`${API}/order/submit/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const submitShippingApi = async (
  userId,
  token,
  shipping,
  file = "cart"
) => {
  return submitShippingFactory(userId, token, shipping, file);
};

export const submitShippingFactory = async (userId, token, shipping, file) => {
  try {
    const response = await fetch(`${API}/${file}/update-shipping/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ shipping }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
