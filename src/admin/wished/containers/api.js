import { API } from "../../../config";

export const updateApi = async (userId, token, id, data) => {
  try {
    const response = await fetch(`${API}/classe/${id}/${userId}`, {
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
    const response = await fetch(`${API}/wisheds/${userId}`, {
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
