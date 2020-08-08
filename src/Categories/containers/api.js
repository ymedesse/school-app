import { API, wooApi } from "../../config";
export const createCategoryApi = async (userId, token, category) => {
  try {
    const response = await fetch(`${API}/category/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const wooCategoriesApi = async (options = {}) => {
  try {
    const response = await wooApi.get("products/categories", { ...options });
    return response;
  } catch (err) {
    console.log(err);
  }
};
