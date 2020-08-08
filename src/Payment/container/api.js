import { API } from "../../config";
//Adsress

export const getAddresses = async (userId, token) => {
  try {
    const response = await fetch(`${API}/braintree/getToken/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
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
        Authorization: `Bearer ${token}`
      }
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const processPayment = async (userId, token, paymentData) => {
  try {
    const response = await fetch(`${API}/braintree/payment/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(paymentData)
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const createOrderApi = async (userId, token, createOrderData) => {
  try {
    const response = await fetch(`${API}/order/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ order: createOrderData })
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
