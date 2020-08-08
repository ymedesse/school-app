
import { API } from "../../config";
import queryString from "query-string";



export const getProductsApi = async sortBy => {
  try {
    const response = await fetch(
      `${API}/products?sortBy=${sortBy}&order=desc&limit=6`,
      {
        method: "GET"
      }
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};


export const readApi = async productId => {
  try {
    const response = await fetch(`${API}/product/${productId}`, {
      method: "GET"
    });
    return response.json();
  }
  catch (err) {
    return console.log(err);
  }
};




export const listRelatedApi = async productId => {
  try {
    const response = await fetch(`${API}/products/related/${productId}`, {
      method: "GET"
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const listApi = async params => {
  const query = queryString.stringify(params);
  try {
    const response = await fetch(`${API}/products/search?${query}`, {
      method: "GET"
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const getCategoriesApi = async () => {
  try {
    const response = await fetch(`${API}/categories`, {
      method: "GET"
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
export const getFilteredProductsApi = async (skip, limit, filters = {}) => {
  const data = {
    limit,
    skip,
    filters
  };

  try {
    const response = await fetch(`${API}/products/by/search`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    console.log(response.json());
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
