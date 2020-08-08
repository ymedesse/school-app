import { API } from "../../config";


export const createApi = async (userId, token, post) => {
  
  try {
    const response = await fetch(`${API}/file/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: post
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const listApi = async (userId, token) => {
  try {
    const response = await fetch(`${API}/files/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const removeApi = async (userId, token, id) => {
  try {
    const response = await fetch(`${API}/file/${id}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};


export const removeManyApi = async (userId, token, ids) => {
  try {
    const response = await fetch(`${API}/file/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ ids })
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const updateApi = async (userId, token, file) => {
  try {
    const response = await fetch(`${API}/file/${file._id}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(file)
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const readApi = async id => {
  try {
    const response = await fetch(`${API}/file/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const updateManyApi = async (userId, token, files) => {
  try {
    const response = await fetch(`${API}/file/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ files })
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
