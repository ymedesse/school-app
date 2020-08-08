import { API } from "../../config";

export const signupApi = async (user) => {
  try {
    const response = await fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const signinApi = async (user) => {
  try {
    const response = await fetch(`${API}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const externalSigninApi = async (data) => {
  try {
    const response = await fetch(`${API}/external-signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const authenticateApi = async (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signoutApi = async (userId) => {
  try {
    const response = await fetch(`${API}/signout/${userId}`, {
      method: "GET",
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const infoApi = async (userId, token) => {
  try {
    const response = await fetch(`${API}/user/info/${userId}`, {
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
