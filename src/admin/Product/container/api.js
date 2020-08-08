import { API } from "../../../config";

export const createApi = async (userId, token, data) => {
  try {
    const response = await fetch(`${API}/product/create/${userId}`, {
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

export const updateApi = async (userId, token, id, data) => {
  try {
    const response = await fetch(`${API}/product/${id}/${userId}`, {
      method: "PUT",
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

export const removeApi = async (userId, token, ids) => {
  try {
    const response = await fetch(`${API}/products/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ids }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
