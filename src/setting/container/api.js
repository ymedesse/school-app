import { API } from "../../config";

export const getSettings = async (userId, token) => {
  try {
    const response = await fetch(`${API}/settings/${userId}`, {
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
