import { API } from "../../config";

export const updateOneListeApi = async (userId, token, data) => {
  try {
    const response = await fetch(`${API}/wished-list/${userId}`, {
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

export const updateInfoApi = async (userId, token, data) => {
  try {
    const response = await fetch(`${API}/wished-list/info/${userId}`, {
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

export const removeOneApi = async (userId, token, liste) => {
  try {
    const response = await fetch(`${API}/wished-list/remove/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ liste }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
