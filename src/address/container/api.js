import { API } from "../../config";
//Adsress

export const getAddressesApi = async (userId, token) => {
  try {
    const response = await fetch(`${API}/addresses/${userId}`, {
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

export const createAddressApi = async (userId, token, address) => {
  try {
    const response = await fetch(`${API}/address/create/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(address)
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const updateAddressApi = async (userId, token, address) => {
  try {
    const response = await fetch(`${API}/address/${address._id}/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(address)
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
