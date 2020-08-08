import { API /*, wooApi as wooCommerceApi*/ } from "../../../config";
import { LOCAL_STATUS } from "./constants";
// const wooApi = wooCommerceApi();
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

export const updateApi = async (userId, token, id, value) => {
  try {
    const response = await fetch(`${API}/order/${id}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(value),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const updateStatusApi = async (userId, token, id, status, type) => {
  const link = type === LOCAL_STATUS ? "local-status" : "status";
  const data = type === LOCAL_STATUS ? { localStatus: status } : { status };

  try {
    const response = await fetch(`${API}/order/${link}/${id}/${userId}`, {
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

export const updateLocalStatusApi = async (userId, token, id, status) => {
  return updateStatusFactory(userId, token, id, status, "local-");
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

const updateStatusFactory = async (
  userId,
  token,
  id,
  status,
  nature = ""
) => {};
