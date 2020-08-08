import { API } from "../../config";
// Pyment
export const readApi = async (userId, token) => {
  try {
    const response = await fetch(`${API}/user/${userId}`, {
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

export const updateApi = async (userId, token, user) => {
  try {
    const response = await fetch(`${API}/user/update/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(user)
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const updateLocalUser = async (user, next) => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("jwt")) {
      let auth = JSON.parse(localStorage.getItem("jwt"));
      auth.user = user;
      localStorage.setItem("jwt", JSON.stringify(auth));
      next();
    }
  }
};
