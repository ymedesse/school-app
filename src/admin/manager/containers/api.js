import { API } from "../../../config";

export const deleteApi = async (userId, token, ids) => {
  try {
    const response = await fetch(`${API}/user/${userId}`, {
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

export const updateManyAccessesApi = async (userId, token, accesses) => {
  try {
    const response = await fetch(`${API}/accesses/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ accesses }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const emptyAccessesApi = async (userId, token) => {
  try {
    const response = await fetch(`${API}/accesses/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const deleteManyAccessesApi = async (userId, token, ids) => {
  try {
    const response = await fetch(`${API}/accesses/${userId}`, {
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

export const createRoleApi = async (userId, token, role) => {
  try {
    const response = await fetch(`${API}/role/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(role),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const updateRoleApi = async (userId, token, userBody) => {
  try {
    const response = await fetch(
      `${API}/user/update-role/${userBody._id}/${userId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userBody),
      }
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const deleteManyRoleApi = async (userId, token, ids) => {
  try {
    const response = await fetch(`${API}/roles/${userId}`, {
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

export const emptyRolesApi = async (userId, token) => {
  try {
    const response = await fetch(`${API}/roles-empty/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const updateManyRolesApi = async (userId, token, roles) => {
  try {
    const response = await fetch(`${API}/roles/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ roles }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
